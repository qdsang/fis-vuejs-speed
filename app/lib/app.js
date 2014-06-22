
function isApp(){
    try{
        if( !!WE ){
            return true;
        }
    }catch(e){}
    return false;
}

function WebEventTrigger(name, data){
    try{
        if( WE && WE.trigger ){
            if( typeof(data) !== 'string' ){
                data = JSON.stringify(data);
            }
            return WE.trigger(name, data);
        }
    }catch(e){}
    return false;
}

module.exports = {
    isApp: isApp,
    trigger: WebEventTrigger
};

