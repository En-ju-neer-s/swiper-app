export default function decode(data) {
    const parser = new DOMParser();
    let decodedString = parser.parseFromString(`<!doctype html><body>${window.atob(data)}`, 'text/html').body.textContent;
    decodedString = decodeSpecialCharacters(decodedString);
    return decodedString;
}

function decodeSpecialCharacters(decodedString) {
    decodedString = decodedString.split('Ã«').join('ë');
    decodedString = decodedString.split('Ã©').join('é');
    decodedString = decodedString.split('Ã¨').join('è');
    decodedString = decodedString.split(`Ã `).join('à');
    decodedString = decodedString.split('Ã¡').join('á');
    decodedString = decodedString.split('Ã¤').join('ä');
    decodedString = decodedString.split('Ã¹').join('ù');
    decodedString = decodedString.split('Ãº').join('ú');
    decodedString = decodedString.split('Ã¼').join('ü');
    decodedString = decodedString.split('Ã¶').join('ö');
    decodedString = decodedString.split('Â©').join('©');
    decodedString = decodedString.split('Â®').join('®');
    decodedString = decodedString.split('Ã').join('À');
    decodedString = decodedString.split('Ã').join('Á');
    decodedString = decodedString.split('Ã').join('Ä');
    decodedString = decodedString.split('Ã').join('È');
    decodedString = decodedString.split('Ã').join('É');
    decodedString = decodedString.split('Ã').join('Ë');
    decodedString = decodedString.split('Ã').join('Ö');
    decodedString = decodedString.split('Ä').join('ć');
    decodedString = decodedString.split('Ä').join('Ć');
    decodedString = decodedString.split('Ã').join('Ù');
    decodedString = decodedString.split('Ã').join('Ú');
    decodedString = decodedString.split('Ã').join('Ü');
    decodedString = decodedString.split('Ã¯').join('ï');
    decodedString = decodedString.split('â¬Ü').join('‘');
    decodedString = decodedString.split('â¬"').join('’');
    decodedString = decodedString.split('â').join('’');
    decodedString = decodedString.split('â').join('‘');

    return decodedString;
}