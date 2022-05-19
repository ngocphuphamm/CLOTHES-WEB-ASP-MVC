//hi?n th? l?i
function showError(input, message) {
    const parent = input.parentElement;
    parent.classList.add('err');
    const small = parent.querySelector('small');
    small.innerText = message;
}

//t?t l?i
function showSuccess(input) {
    const parent = input.parentElement;
    if (parent.classList.contains('err')) {
        parent.classList.remove('err');
        const small = parent.querySelector('small');
        small.innerText = ' ';
    }
}

function getPlaceholder(input) {
    return input.getAttribute('placeholder');
}
class Validation {
    //ki?m tra ch?a nh?p
    checkRequired(inputArr) {
        let isRequired = true;
        inputArr.forEach(function (input) {
            if (input.value.trim() === '') {
                showError(input, `${getPlaceholder(input)} kh�ng ???c tr?ng`);
                isRequired = false;
            } else {
                showSuccess(input);
            }
        });
        return isRequired;
    }

    //ki?m tra email h?p l?
    checkEmail(input) {
        let check = false;
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(input.value.trim())) {
            showSuccess(input);
            check = true;
        } else {
            showError(input, 'Email kh�ng h?p l?');
        }
        return check;
    }

    checkNumberPhone(input) {
        let check = false;
        let regex =
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (regex.test(input.value.trim())) {
            showSuccess(input);
            check = true;
        } else {
            showError(input, 'S? ?i?n tho?i kh�ng h?p l?');
        }
        return check;
    }
    checkPasswordMatches(inputPass1, inputPass2) {
        let check = false;
        let pass1 = inputPass1.value.trim();
        let pass2 = inputPass2.value.trim();
        if (pass1 == pass2) {
            check = true;
            showSuccess(inputPass2);
        } else {
            showError(inputPass2, 'M?t kh?u kh�ng kh?p');
        }
        return check;
    }

    //ki?m tra t?nh th�nh ph? qu?n huy?n x�
    checkAddress(selectArr) {
        let check = true;
        selectArr.forEach(function (select) {
            if (select.value.trim() == 'none') {
                showError(select, `B?n ch?a ch?n ${getPlaceholder(select)}`);
                check = false;
            } else {
                showSuccess(select);
            }
        });
        return check;
    }
}
export default new Validation();