
const {ensureFile,writeJson,readJsonSync,pathExistsSync}=require("fs-extra");

const path = require("path");

const CONFIGPATH=path.join(process.cwd(),'/font/lugia-iconConfig.json');
const ICONJSONPATH=path.join(process.cwd(),'/font/lugia-icon.json');
const SYMBOLICONJSONPATH=path.join(process.cwd(),'/font/lugia-symbol-icon.json');

const iconJson=readJsonSync(ICONJSONPATH);
const symbolIconJson=readJsonSync(SYMBOLICONJSONPATH);

if(iconJson && symbolIconJson){
    write();
}



async function write() {
    const symbolIconsType=[{ category: 'symbol', name: '彩色图标' }];
    const symbolIconPrefix='lugia-symbol-icon-';
    const hasFile=pathExistsSync(CONFIGPATH);
    if(!hasFile){
        await ensureFile(CONFIGPATH);
        await writeJson(CONFIGPATH,[]);
    }
    const readOldConfigJson=readJsonSync(CONFIGPATH);
    const resultIconData= getCompareConfigData(iconJson,readOldConfigJson);
    const resultSymbolIconData=getCompareConfigData(symbolIconJson,readOldConfigJson,symbolIconsType,symbolIconPrefix);

    if(resultIconData && resultSymbolIconData){
        await writeJson(CONFIGPATH,[...resultIconData,...resultSymbolIconData]);
    }

}

function getCompareConfigData(iconJsonData={},readOldConfigJson=[],iconsType,iconPrefix){
    const newType=iconsType || [
        { category: 'direction', name: '方向图标' },
        { category: 'financial', name: '金融图标' },
        { category: 'logo', name: 'logo图标' },
        { category: 'reminder', name: 'reminder图标' },

    ];
    const icons=iconJsonData&&Object.keys(iconJsonData);
    if(!icons || icons.length<1){
        return [];
    }
    const oldJson=readOldConfigJson;

    const hasOldJson=oldJson && Array.isArray(oldJson) && oldJson.length>0;

    const data=[];

    const prefix=iconPrefix || 'lugia-';

    icons.forEach((icon)=>{
        const item=hasOldJson && oldJson.find(({iconClass})=>iconClass===`${prefix}${icon}`);
        const include=newType.find(({category})=>icon.includes(category));
        if(item){
            data.push(item)
        }else{
            include && data.push({...include,iconClass:`${prefix}${icon}`,name:''});
        }
    });
    return data;

}
