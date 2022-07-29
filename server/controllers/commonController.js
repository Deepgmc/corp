const fetch = require('node-fetch')
const parseString = require('xml2js').parseString

const getCBRFCurrency = async function (req, res, next) {

    const forDate = req.query.forDate
    const url = `http://www.cbr.ru/scripts/XML_daily.asp?date_req=${forDate}`

    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type','text/plain; charset=windows-1251')

    await fetch(url, {
        headers: { 'Content-Type': 'application/json; charset=cp1251' }
    })
        .then(response => {
            return response.text()
        })
        .then(data => {
            parseString(data, (err, result) => {
                if(typeof result.ValCurs === 'undefined'){
                    throw new Error('Неверный ответ ЦБ РФ по валютам')
                }
                /**
                    <Valute ID="R01235">
                        <NumCode>840</NumCode>
                        <CharCode>USD</CharCode>
                        <Nominal>1</Nominal>
                        <Name>Доллар США</Name>
                        <Value>60,2031</Value>
                    </Valute>
                    <Valute ID="R01090B">
                        <NumCode>933</NumCode>
                        <CharCode>BYN</CharCode>
                        <Nominal>1</Nominal>
                        <Name>Белорусский рубль</Name>
                        <Value>23,0046</Value>
                    </Valute>
                    <Valute ID="R01239">
                        <NumCode>978</NumCode>
                        <CharCode>EUR</CharCode>
                        <Nominal>1</Nominal>
                        <Name>Евро</Name>
                        <Value>61,2171</Value>
                    </Valute>
                    <Valute ID="R01270">
                        <NumCode>356</NumCode>
                        <CharCode>INR</CharCode>
                        <Nominal>100</Nominal>
                        <Name>Индийских рупий</Name>
                        <Value>75,2762</Value>
                    </Valute>
                    <Valute ID="R01335">
                        <NumCode>398</NumCode>
                        <CharCode>KZT</CharCode>
                        <Nominal>100</Nominal>
                        <Name>Казахстанских тенге</Name>
                        <Value>12,5381</Value>
                    </Valute>
                    <Valute ID="R01375">
                        <NumCode>156</NumCode>
                        <CharCode>CNY</CharCode>
                        <Nominal>10</Nominal>
                        <Name>Китайских юаней</Name>
                        <Value>90,4549</Value>
                    </Valute>
                    <Valute ID="R01700J">
                        <NumCode>949</NumCode>
                        <CharCode>TRY</CharCode>
                        <Nominal>10</Nominal>
                        <Name>Турецких лир</Name>
                        <Value>33,6590</Value>
                    </Valute>
                    <Valute ID="R01717">
                        <NumCode>860</NumCode>
                        <CharCode>UZS</CharCode>
                        <Nominal>10000</Nominal>
                        <Name>Узбекских сумов</Name>
                        <Value>55,0182</Value>
                    </Valute>
                    <Valute ID="R01775">
                        <NumCode>756</NumCode>
                        <CharCode>CHF</CharCode>
                        <Nominal>1</Nominal>
                        <Name>Швейцарский франк</Name>
                        <Value>62,8687</Value>
                    </Valute>
                    <Valute ID="R01670">
                        <NumCode>972</NumCode>
                        <CharCode>TJS</CharCode>
                        <Nominal>10</Nominal>
                        <Name>Таджикских сомони</Name>
                        <Value>58,6409</Value>
                    </Valute>
                    <Valute ID="R01500">
                        <NumCode>498</NumCode>
                        <CharCode>MDL</CharCode>
                        <Nominal>10</Nominal>
                        <Name>Молдавских леев</Name>
                        <Value>31,1712</Value>
                    </Valute>
                    <Valute ID="R01370">
                        <NumCode>417</NumCode>
                        <CharCode>KGS</CharCode>
                        <Nominal>100</Nominal>
                        <Name>Киргизских сомов</Name>
                        <Value>72,4723</Value>
                    </Valute>
                    */
                result.ValCurs.Valute = result.ValCurs.Valute.map((val) => {
                    const numCode = parseInt(val.NumCode[0], 10)
                    let name = ''
                    switch(numCode){
                        case 840: name = 'Доллар США'; break
                        case 933: name = 'Белорусский рубль'; break
                        case 978: name = 'Евро'; break
                        case 356: name = 'Индийская рупия'; break
                        case 398: name = 'Казахстанский тенге'; break
                        case 156: name = 'Китайский юань'; break
                        case 949: name = 'Турецкая лира'; break
                        case 860: name = 'Узбекская сума'; break
                        case 756: name = 'Швейцарский франк'; break
                        case 972: name = 'Таджикский сомони'; break
                        case 498: name = 'Молдавская лея'; break
                        case 417: name = 'Киргизский сом'; break
                        default: name = false
                    }
                    return {
                        numCode : numCode,
                        charCode: val.CharCode[0],
                        nominal : val.Nominal[0],
                        value   : val.Value[0],
                        name    : name
                    }
                })
                .filter(value => value.name)

                res.send({error: false, currencies: result.ValCurs.Valute})
            })


        })
        .catch((error) => {
            console.log('Currency error: ', error);
        })

}

module.exports = {
    getCBRFCurrency
}