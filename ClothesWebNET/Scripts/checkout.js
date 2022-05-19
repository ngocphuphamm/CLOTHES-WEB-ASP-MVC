const formInfo = document.querySelector('.form-info');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const address = document.getElementById('address');

const city = document.getElementById('province');
const district = document.getElementById('district');
const ward = document.getElementById('village');

fetch('/data.json')
    .then((response) => response.json())
    .then((data) => renderCity(data));

function renderCity(data) {
    for (var item of data) {
        // kh?i t?o ra ??i t??ng c�c t?nh th�nh ph?
        city.options[city.options.length] = new Option(item.Name, item.Id);
    }

    // x? l� khi thay ??i t?nh th�nh th� s? hi?n th? ra qu?n huy?n thu?c t?nh th�nh ?�
    city.onchange = () => {
        district.length = 1;

        console.log(city.value);
        // ki?m tra gi� tr? value xem c� r?ng ko l� none th� ko th?c hi?n render c�c qu?n ra
        if (city.value != '') {
            // l?c ra d? li?u khi ng??i d�ng tr? v�o t?nh th�nh ph?
            const result = data.filter((n) => n.Id === city.value);
            // nguy�n nh�n result[0].District
            // gi?i th�ch :
            // th� l�c ta l?c d? li?u result xong th� k?t qu? n� s? tr? cho ra m?t m?ng
            // trong m?ng ?� ch?a ??i t??ng [{}]
            // th� c� ph?i ??i t??ng m�nh g?i trong ?� ?ang ? index = 0 th� m�nh ph?i g?i n� ra
            // l�
            //   result[0] th� l�c n�y n� ra  object{} th� trong object m�nh g?i ??n attribute l� DISTRICTS
            //     => result[0].Districts
            for (var item of result[0].Districts) {
                district.options[district.options.length] = new Option(
                    item.Name,
                    item.Id
                );
            }
        } else {
            // do nothing
        }
    };

    district.onchange = () => {
        ward.length = 1;
        const result = data.filter((el) => el.Id === city.value);
        if (district.value != ' ') {
            // l?y d? li?u qu?n v� trong d? li?u qu?n ch? t�n ???ng
            const resultDistrict = result[0].Districts.filter(
                (el) => el.Id === district.value
            );

            for (var item of resultDistrict[0].Wards) {
                ward.options[ward.options.length] = new Option(item.Name, item.id);
            }
        }
    };
}
// renderCity(dt);
import validation from './validation.js';

//submit form
formInfo.addEventListener('submit', function (e) {
    e.preventDefault();
    let checkEmpty = validation.checkRequired([fullname, email, phone, address]);
    let checkEmailInvalid = validation.checkEmail(email);
    let checkPhoneInvalid = validation.checkNumberPhone(phone);
    let checkAddressInvalid = validation.checkAddress([city, district, ward]);

    if (
        checkEmpty &&
        checkEmailInvalid &&
        checkPhoneInvalid &&
        checkAddressInvalid
    )
        alert('oke bro');
});