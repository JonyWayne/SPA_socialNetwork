
// Из user-reducer берем фрагмент кода
export const updateObjectInArray=(items:any, itemID:any, objPropName:any,newObjProps:any)=>{
    return items.map((u:any) => {                
        if (u[objPropName] === itemID) {
            return { ...u, ...newObjProps }
        }
        return u;
    })
}
