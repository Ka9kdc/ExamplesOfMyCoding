function ValidateAddresses (addresses){
    const stateRegEx = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
    const zipRegEx = /^\d{5}(-\d{4})?$/
    const notCity = /[-!$%^&*()_+|~=`{}[:;<>?,@#\]]/g
    const notStreet = /[-!$%^&*()_+|~=`{}[:;<>?@\]]/g
    if (!stateRegEx.test(addresses.state)) return false;
    if (!zipRegEx.test(addresses.zip)) return false;
    if (notCity.test(addresses.city)) return false;
    if (notStreet.test(addresses.street)) return false;
    return true
}

function ValidatePhone (phone){
    const phoneReq = /((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/i
    return phoneReq.test(phone)
}

function ValidateCallsign (callsign){
        //     All amateur radio call signs:
        // [a-zA-Z0-9]{1,3}[0123456789][a-zA-Z0-9]{0,3}[a-zA-Z]

        // Non-US call signs:
        // \b(?!K)(?!k)(?!N)(?!n)(?!W)(?!w)(?!A[A-L])(?!a[a-l])[a-zA-Z0-9][a-zA-Z0-9]?[a-zA-Z0-9]?[0123456789][a-zA-Z0-9][a-zA-Z0-9]?[a-zA-Z0-9]?[a-zA-Z0-9]?\b

        // US call signs:
        // [AKNWaknw][a-zA-Z]{0,2}[0123456789][a-zA-Z]{1,3}
        const callsignReg = /^[AaWaKkNn][a-zA-Z]?[0-9][a-zA-Z]{1,3}$/
    return callsignReg.test(callsign)
}

function ValidateEmail (email){
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return reg.test(email)
}

function ValidateName (name){
    return !(/^[0-9-!$%^&*()_+|~={}[:;<>?@#\]]/g.test(name))
}

function ValidateCompany (Company) {
    return !(/^[-!$%^&*()_+|~={}[:;<>?@#\]]/g.test(Company))
}
