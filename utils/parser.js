function parseError(error) {
    // check type of error
    // if array -> express validator, take msg and path props from array
    // if error.name = ValidationError -> Mongoose validation, take error.entries ([field, e]) =>[field, e.message]
    // else, process regular error, take message prop
    // return { messages: [String], fields: Object }

    let result = {
        messages: [],
        fields: {}
    }

    if(error.name == 'ValidationError') {
        // mongoose
        for(let [field, e] of Object.entries(error.errors)) {
            result.messages.push(e.message);
            result.fields[field] = field;
        }
        result.fields = Object.fromEntries(Object.keys(error.errors).map(k => [k, k])); 
    } else if(Array.isArray(error)) {
        // validator
        result.messages = error.map(e => e.msg);
        result.fields = Object.fromEntries(error.map(e => [e.path, e.path]))
    } else {
        // simple error
        result.messages.push(error.message);
    }

    return result;
}

module.exports = {
    parseError
}