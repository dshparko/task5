String.prototype.replaceIn = function (idx, rep) {
    return this.substring(0, idx) + rep + this.substring(idx + rep.length);
};

engpol = "abcdefghijklmnopqrstuvwxyz".split("");
russian = "абвгдеёжзийклмнопрстуфхцчшщьъыэюя".split("");
let iter = 1;
let numberOfRecs = 1;

let language = "en";
let curalpha = engpol;
let size = 26;
let table = document.getElementById("table");

function getData() {

    let idseed = "seeden";
    let iderr = "erren";

    if (language === "en") {
        idseed = "seeden";
        faker.locale = "en";
        curalpha = engpol;
        iderr = "erren";
        size = 26;
    } else if (language === "uk") {
        idseed = "seedby";
        faker.locale = "uk";
        iderr = "erruk";
        curalpha = engpol;
        size = 26;
    } else {
        idseed = "seedru";
        faker.locale = "ru";
        iderr = "errru";
        curalpha = russian;
        size = 33;
    }

    let s = document.getElementById(idseed).value;
    let er = document.getElementById(iderr).value;
    let x = Number(s);
    let z = Number(er);
    faker.seed(x * iter);
    let arg = new Math.seedrandom(x * iter);
    let wholeNumber = Math.floor(z);
    let fraction = z % 1;

    for (let i = 0; i < 20; i++) {
        let [fullName, address, email, phone, id] = [
            faker.name.findName(),
            faker.address.city() + " " + faker.address.streetAddress() + " ",
            faker.internet.email(),
            faker.phone.phoneNumber(),
            faker.random.uuid(),
        ];
        let arr = [fullName, address, email, phone, id];
        for (let j = 0; j < wholeNumber; j++) {
            let index = Math.floor(arg() * 5);
            let word = arr[index];
            let oper = Math.floor(arg() * 3);
            if (oper == 0) {
                let rep = curalpha[Math.floor(arg() * size)];
                let pos = Math.floor(arg() * word.length);
                arr[index] = arr[index].replaceIn(pos, rep);
            } else if (oper == 1) {
                let pos = Math.floor(arg() * word.length);
                arr[index] = arr[index].replaceIn(pos, "");
            } else {
                let pos = Math.floor(arg() * word.length);

                if (pos < word.length - 1) {
                    let c1 = arr[index].charAt(pos);
                    let c2 = arr[index].charAt(pos + 1);
                    arr[index] = arr[index].replaceIn(pos, c2);
                    arr[index] = arr[index].replaceIn(pos + 1, c1);
                } else {
                    let c1 = arr[index].charAt(pos);
                    let c2 = arr[index].charAt(pos - 1);
                    arr[index] = arr[index].replaceIn(pos, c2);
                    arr[index] = arr[index].replaceIn(pos - 1, c1);
                }
            }
        }
        if (fraction > 0 && arg() < fraction) {
            let index = Math.floor(arg() * 5);
            let word = arr[index];
            let oper = Math.floor(arg() * 3);
            if (oper == 0) {
                let rep = curalpha[Math.floor(arg() * size)];
                let pos = Math.floor(arg() * word.length);
                arr[index] = arr[index].replaceIn(pos, rep);
            } else if (oper == 1) {
                let pos = Math.floor(arg() * word.length);
                arr[index] = arr[index].replaceIn(pos, "");
            } else {
                let pos = Math.floor(arg() * word.length);

                if (pos < word.length - 1) {
                    let c1 = arr[index].charAt(pos);
                    let c2 = arr[index].charAt(pos + 1);
                    arr[index] = arr[index].replaceIn(pos, c2);
                    arr[index] = arr[index].replaceIn(pos + 1, c1);
                } else {
                    let c1 = arr[index].charAt(pos);
                    let c2 = arr[index].charAt(pos - 1);
                    arr[index] = arr[index].replaceIn(pos, c2);
                    arr[index] = arr[index].replaceIn(pos - 1, c1);
                }
            }
        }

        table.innerHTML +=
            "<tr><td class='bold'>" +
            numberOfRecs +
            "</td><td class='normal'>" +
            arr[0] +
            "</td><td class='normal'>" +
            arr[3] +
            "</td><td class='normal'>" +
            arr[4] +
            "</td><td class='normal'>" +
            arr[1] +
            "</td><td class='normal'>" +
            arr[2] +
            "</td></tr>";
        numberOfRecs++;
    }
    iter++;
}

function reload() {
    $("input[lang]").hide();
    $("button[lang]").hide();
    let elem = document.getElementById("language");
    let l = elem.options[elem.selectedIndex].text;

    if (l === "USA") {
        language = "en";
        $('input[lang="en"]').show();
        $('button[lang="en"]').show();
        console.log("en");
    } else if (l === "Ukraine") {
        language = "uk";
        $('input[lang="uk"]').show();
        $('button[lang="uk"]').show();
        console.log("uk");
    } else {
        language = "ru";
        $('input[lang="ru"]').show();
        $('button[lang="ru"]').show();
        console.log("ru");
    }
    refresh();
}

function refresh() {
    iter = 1;
    numberOfRecs = 1;
    table.innerHTML =
        "<thead><tr><td class='bold'>Index</td><td class='bold'>Full Name</td><td class='bold'>Phone</td><td class='bold'>Id</td><td class='bold'>Address</td><td class='bold'>Email</td></tr></thead>";
    getData();
}


window.addEventListener("scroll", function () {
    let side = document.getElementById("table");
    let contentHeight = side.offsetHeight;
    let yOffset = window.pageYOffset;
    let window_height = window.innerHeight;
    let y = yOffset + window_height;

    if (y >= contentHeight) {
        getData();
    }
});