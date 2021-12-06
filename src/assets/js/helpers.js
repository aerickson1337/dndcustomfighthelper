export function saveData(jsonData, fileName) {
    const blob = new Blob([JSON.stringify(jsonData)], { type: "text/json" })
    var a = document.createElement("a")
    document.body.appendChild(a)
    a.style = "display: none"

    var url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
}