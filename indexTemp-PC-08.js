let dirHandle;
async function Button() {
    dirHandle = await window.showDirectoryPicker();
    let dirStructObj = {}
    dirStructObj = await getDirStruct(dirHandle)
    console.log(dirStructObj)
    document.write(await JSON.parse(JSON.stringify(dirStructObj)))
    console.log(await JSON.parse(JSON.stringify(dirStructObj)))
}
async function getDirStruct(dir) {
    let info = {
        path: '',
        name: dir.name,
        kind: dir.kind
    }
    if (dir.kind == 'directory') {
        info.sub_items = []
        for await (const subEntry of dir.values()) {
            info.sub_items.push(getDirStruct(subEntry))
            Promise.all(info.sub_items).then((values) => {
                info.sub_items = values
                //info.sub_items.push(values)
            })
        }
    } else {
        let name = ''
        name = dir.name
        info.type = name.substring(name.lastIndexOf(".") + 1)
    }
    return info
}
