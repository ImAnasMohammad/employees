

const emailValidation = (email)=>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}


function mobileNumberValidation(mobile) {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
}
  

module.exports = {emailValidation,mobileNumberValidation}


// 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