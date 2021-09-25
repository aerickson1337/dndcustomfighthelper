
export default class Entity {
    // Possible expected Constructor values
    // ----------------------------------------
    // name
    // armor_class, hit_points, attack_bonus, number_of_attacks, damage_dice, flat_damage_bonus
    // positive_bonus_dice, negative_bonus_dice
    // has_elven_accuracy, has_great_weapon_fighting, has_elemental_adept, has_great_weapon_master_crit_bonus, has_halfling_lucky
    // critical_bonus_dice
    // ----------------------------------------
    constructor(...data) {
        // set constructor values if provided
        for (var key in data[0]) {
            this[key] = data[0][key]
        }
    }
}