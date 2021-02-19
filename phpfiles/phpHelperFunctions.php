<?php
$notStreet = "/[-!$%^&*()_+|~=`{}[:;<>?@\]]/";
$not_city_reg = "/[-!$%^&*()_+|~=`{}[:;<>?,@#\]]/";
$st_reg = "/^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/";
$zipRegEx = "/^\d{5}(-\d{4})?$/";
$phoneReq = "/((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/i";
$callsignReg = "/^[AaWaKkNn][a-zA-Z]?[0-9][a-zA-Z]{1,3}$/";
$email_reg = "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/";
$name_regex = "/^[0-9-!$%^&*()_+|~={}[:;<>?@#\]]/";
$company_regEx = "/^[-!$%^&*()_+|~={}[:;<>?@#\]]/";

function validate_street ($street_to_validate){
    if(preg_match_all($notStreet, $street_to_validate)) return FALSE;
    else return TRUE;
}

function validate_city ($city_to_validate){
    if(preg_match_all($not_city, $city_to_validate)) return FALSE;
    else return TRUE;
}

function validate_state ($st_to_validate){
    return preg_match($st_reg, $st_to_validate);
}

function validate_zip ($zip_to_validate){
    return preg_match($zipRegEx, $zip_to_validate);
}

function validate_phone ($phone_to_validate){
    return preg_match($phoneReq, $phone_to_validate);
}

function validate_callsign ($callsign_to_validate){
    return preg_match($callsignReg, $callsign_to_validate);
}

function validate_email ($email_to_validate){
    return preg_match($email_reg, $email_to_validate);
}

function validate_name ($name_to_validate){
    if (preg_match_all($name_regex, $name_to_validate)) return FALSE;
    else return TRUE;
}

function validate_company($company_to_validate){
    if (preg_match_all($company_regEx, $company_to_validate)) return FALSE;
    else return TRUE;
}


?>