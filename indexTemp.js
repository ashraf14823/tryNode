let dirHandle;
async function Button() {
    if(window.Prototype) {
        delete Object.prototype.toJSON;
        delete Array.prototype.toJSON;
        delete Hash.prototype.toJSON;
        delete String.prototype.toJSON;
    }
    dirHandle = await window.showDirectoryPicker();
    // let dirStructObj = {}
    let dirStructObj = await getDirStruct(dirHandle)
    console.log(dirStructObj)
    //getDirStruct_as_JSON(dirHandle).then((value => document.write(value)))
    let stringified = JSON.stringify(dirStructObj)
    document.write(stringified)
    console.log(getAll_Files(dirHandle))
}

let path = ''
async function getDirStruct(entry) {
    let info = {
        path: path,
        name: '',
        kind: entry.kind
    }
    info.name = entry.name
    if  (entry.kind == 'directory') {
        path +=  entry.name
    
        info.sub_items = []
        for await (const subEntry of entry.values()) {
            info.sub_items.push(getDirStruct(subEntry))
            Promise.all(info.sub_items).then((value) => {
                info.sub_items = value
            })
        }
        path = ''
    } else {

        let name = ''
        name = entry.name
        info.type = name.substring(name.lastIndexOf(".") + 1)

    }
    
    return info
}
async function getAll_Files(dirStruct){
   let allFiles = []
   let info = {
    path: '',
    name: dirStruct.name,
    kind: dirStruct.kind
}
if  (dirStruct.kind == 'directory') {
    info.sub_items = []
    for await (const subEntry of dirStruct.values()) {
        await info.sub_items.push(getDirStruct(subEntry))
        Promise.all(info.sub_items).then((value) => {
            info.sub_items = value
        })
    }
} else {

    let name = ''
    name = dirStruct.name
    info.type = name.substring(name.lastIndexOf(".") + 1)
    allFiles.push(info)
}
return allFiles

}

// async function getDirStruct_as_JSON(dir) {
//     let info_Obj = {
//         path: '',
//         name: dir.name,
//         kind: dir.kind
//     }
//     let info = "{    \"path\": \"" + "__dir_path_here  " + "\",   \"name\": \"" + dir.name + "\", \"kind\": \"" + dir.kind + "\""
//     if (dir.kind == 'directory') {
//         info_Obj.sub_items = []
//         if (info != '') {
//             info += ", sub_items: ["
//         }
//         for await (const subEntry of dir.values()) {
//             info += JSON.stringify(getDirStruct_as_JSON(subEntry))
//             info += ","

//         }
//     }
//     info += "]}"
//     console.log("\\");
//     return info
// }



