import dmgLib from '@/assets/js/dmgLib.js'
import defaultAttack from '@/assets/json/entities/defaultAttack.json'

export default class Entity {
    // Possible expected Constructor values
    // ----------------------------------------
    // name
    // armor_class, hit_points
    // attack_bonus, number_of_attacks, damage_dice, flat_damage_bonus
    // positive_bonus_dice, negative_bonus_dice
    // has_great_weapon_fighting, has_elemental_adept, has_great_weapon_master_crit_bonus,
    // has_elven_accuracy, has_halfling_lucky
    // critical_bonus_dice 
    // ----------------------------------------
    constructor({...data}) {
        this.map_and_pop('name', data)
        this.map_and_pop('armor_class', data)
        this.map_and_pop('hit_points', data)
        this.map_and_pop('entity_type', data)
        if (data.attacks != null && data.attacks.length && data.attacks.length > 0) {
          this.attacks = []
          data.attacks.forEach(attack => {
            this.attacks.push(new EntityAttack({...attack}))
          })
        } else {
          this.attacks = [new EntityAttack({...data})]
        }
    }

    map_and_pop(key, data) {
        if (key in data) {
            this[key] = data[key]
            delete data[key]
        }
    }

    init_new_attack() {
        this.attacks.push(new EntityAttack({...defaultAttack}))
    }

    delete_attack_at_index(index) {
        this.attacks.splice(index, 1)
    }

    pretty_entity_type() {
        var prettyName = (this.entity_type.charAt(0).toUpperCase() + this.entity_type.slice(1)).slice(0, -1)
        return prettyName
    }
}

class EntityAttack {
    // Possible expected Constructor values
    // ----------------------------------------
    // attack_name, attack_enabled
    // attack_bonus, number_of_attacks, damage_dice, flat_damage_bonus
    // positive_bonus_dice, negative_bonus_dice
    // has_great_weapon_fighting, has_elemental_adept, has_great_weapon_master_crit_bonus,
    // has_elven_accuracy, has_halfling_lucky
    // critical_bonus_dice 
    // ----------------------------------------
    constructor({...data}) {
        // set constructor values if provided
        this.attack_enabled = true
        for (var key in data) {
            this[key] = data[key]
        }
        if (this.dice == null || this.dice.length === 0) {
            let possibleDice = [4, 6, 8, 10, 12]
            this.dice = possibleDice.map(diceVal => {
                return { 
                    name: 'd'+diceVal,
                    value: diceVal,
                    damageCount: "",
                    bonusCount: "",
                    reductionCount: "",
                    criticalCount: "" 
                }
            })
        }
    }


    whoami() {
        return this
    }

    update_or_set(key, value) {
        this[key] = value
    }

    // makes an array of arrays containing buff values needed when calculating hit chance
    // having 1d4 of bless makes -> [[1,2,3,4]]
    generate_bonus_dice_array() {
        // all buffs stored here
        var allBonuses = []
        this.dice.forEach(dice => {
          var bonusDiceArray = [] // create an array for each dice size, reset the array each iteration
          for (var i = 1; i <= dice.value; i++) {
            bonusDiceArray.push(i)
          }
          // if that dice size has inputs, push that many bonus inputs to allBonuses for math later
          if (dice.bonusCount > 0) {
            for (var j = 0; j < dice.bonusCount; j++) {
              allBonuses.push([...bonusDiceArray])
            }
          }
          // while we do this get the reduction/debuff values as well and push them to allBonuses for math later
          if (dice.reductionCount > 0) {
            for (var k = 0; k < dice.reductionCount; k++) {
              allBonuses.push([...bonusDiceArray].map(x => x * -1))
            }
          }
        })
        // returns [[1,2,3,4],[-1,-2,-3,-4]] if 1d4 bonus and 1d4 reduction selected, 
        // scales to any dice input and returns logical outcome of selection
        return allBonuses
    }

    base_hit_chance(target_armor_class, include_flat_buffs=true) {
        let buff_dice_array = []
        if (include_flat_buffs) {
            buff_dice_array = this.generate_bonus_dice_array()
        }``
        return dmgLib.genericBBB(target_armor_class, this.attack_bonus, buff_dice_array)
    }

    determine_hit_chance_feature_calculation() {
        if (this.has_elven_accuracy) {
            return 'elvenaccuracy'
        } else if (this.has_halfling_lucky) {
            return 'halflinglucky'
        }
        return null
    }

    hit_chance_with_features(target_armor_class, include_flat_buffs=true) {
        let buff_dice_array = []
        if (include_flat_buffs) {
            buff_dice_array = this.generate_bonus_dice_array()
        }
        let base_chance_to_hit = dmgLib.genericBBB(target_armor_class, this.attack_bonus, buff_dice_array)
        let feature_calculation = this.determine_hit_chance_feature_calculation()
        if (feature_calculation != null) {
            return dmgLib[feature_calculation](base_chance_to_hit)
        }
        return base_chance_to_hit
    }

    hit_chance_with_advantage(target_armor_class, include_flat_buffs=true) {
        return dmgLib.advantage(this.base_hit_chance(target_armor_class, include_flat_buffs))
    }

    hit_chance_with_disadvantage(target_armor_class, include_flat_buffs=true) {
        return dmgLib.disadvantage(this.base_hit_chance(target_armor_class, include_flat_buffs))
    }

    determine_which_average_damage_calculation() {
        if (this.has_great_weapon_fighting && this.has_elemental_adept) {
            return 'avgdamageGWFEA'
        } else if (this.has_great_weapon_fighting) {
            return 'avgdamageGWF'
        } else if (this.has_elemental_adept) {
            return 'avgdamageEA'
        }
        return 'avgdamage'
    }

    average_damage() {
        if (this.dice != null && !this.dice.length) {
            return 0
        }
        let whichCalculation = this.determine_which_average_damage_calculation()
        return (this.dice.map(dice => 
            dmgLib[whichCalculation](dice.value, dice.damageCount)
          ).reduce((a,b) => a + b) + this.flat_damage_bonus)
    }

    average_dpr(target_armor_class, include_flat_buffs=true, hit_chance_function='base_hit_chance') {
        var givenDPR = dmgLib.damagePerRound(this[hit_chance_function](target_armor_class, include_flat_buffs), dmgLib.critchance(20), this.average_damage())
        return givenDPR * this.number_of_attacks
    }
}
