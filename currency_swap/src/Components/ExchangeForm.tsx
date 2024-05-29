import React, { useState } from 'react'; 
import {Form,Button,InputGroup,Modal} from 'react-bootstrap';
import PopupMessage from './PopupMessage';
import TokenSelectModal from './TokenSelectModal';
import '../form.css'


// define what properties component has
interface currency_token {
    currency:string;
    price:number;
}
// sample data provided (Need to give full name of currency)
const currencyData:currency_token[]=[
    { "currency": "BLUR", "price": 0.20811525423728813 },
    { "currency": "BUSD", "price": 0.999183113 },
    { "currency": "USD", "price": 1 },
    { "currency": "ETH", "price": 1645.9337373737374 },
    { "currency": "GMX", "price": 36.345114372881355 },
    {"currency":"STEVMOS","price":0.07276706779661017},
    {"currency":"LUNA","price":0.40955638983050846},
    {"currency":"RATOM","price":10.250918915254237},
    {"currency":"STRD","price":0.7386553389830508},
    {"currency":"EVMOS","price":0.06246181355932203},
    {"currency":"IBCX","price":41.26811355932203},
    {"currency":"IRIS","price":0.0177095593220339},
    {"currency":"ampLUNA","price":0.49548589830508477},
    {"currency":"KUJI","price":0.675},
    {"currency":"STOSMO","price":0.431318},
    {"currency":"USDC","price":0.989832},
    {"currency":"axlUSDC","price":0.989832},
    {"currency":"ATOM","price":7.186657333333334},
    {"currency":"STATOM","price":8.512162050847458},
    {"currency":"OSMO","price":0.3772974333333333},
    {"currency":"rSWTH","price":0.00408771},
    {"currency":"STLUNA","price":0.44232210169491526},
    {"currency":"LSI","price":67.69661525423729},
    {"currency":"OKB","price":42.97562059322034},
    {"currency":"OKT","price":13.561577966101694},
    {"currency":"SWTH","price":0.004039850455012084},
    {"currency":"USC","price":0.994},
    {"currency":"USDC","price":1},
    {"currency":"WBTC","price":26002.82202020202},
    {"currency":"wstETH","price":1872.2579742372882},
    {"currency":"YieldUSD","price":1.0290847966101695},
    {"currency":"ZIL","price":0.01651813559322034}
    
]


function ExchangeForm(){

  const[showPopup,setShowPopup] =useState(false);
  const[showTokenModal, setShowTokenModal] = useState(false); // State to handle visibility of the token modal
  const[buyOrSellField,setBuyOrSellField] = useState('');


  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellCurrency, setSellCurrency] = useState('Select Token');
  const [buyCurrency, setBuyCurrency] = useState<string>('Select Token');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const inputChange = (e:any)=>{
    const value = e.target.value;
    if (value && !/^\d*\.?\d*$/.test(value)) {
        setShowPopup(true);
        e.target.value = value.replace(/[^0-9.]/g, ''); 
    }
};

const closePopup = () => {
    setShowPopup(false); // Function to close Input Error Message
};

const toggleTokenModal = (value:any) => {
  setBuyOrSellField(value);
  setShowTokenModal(!showTokenModal); // Toggle the visibility of the token modal
};

const handleSellTokenSelection = (token: string) => {
  if (buyOrSellField === 'sell') {
    setSellCurrency(token);
  } else if (buyOrSellField === 'buy') {
    setBuyCurrency(token);
  }
  setShowTokenModal(false);
};



  //   //Callback function ->function passed into another function as argument (executed after first function)
  //  const selectCurrencyInstance = currencyData.reduce((acc:currency_token[],current) =>{
  //   const x = acc.find(item => item.currency === current.currency);
  //   return x ? acc : [...acc, current];
  // }, []);

  // const handleConvert = () => {
  //   const fromRate = selectCurrencyInstance.find(c => c.currency === fromCurrency)?.price || 1;
  //   const toRate = selectCurrencyInstance.find(c => c.currency === toCurrency)?.price || 1;
  //   const result = (amount * fromRate) / toRate;
  //   setConvertedAmount(result);
  // };
  return(
    <div className='set-outer-color rounded-4'>
       
        <Form>
        <div className='flex' >
      <Form.Group className="mb-3 px-5  " controlId="forSell">
      <Form.Label className="text-white">Sell</Form.Label>
        <Form.Control 
        type='text'
        placeholder ="0" 
        className='py-3 rounded-4 '
        onChange={inputChange}
         
         />
         <div>
          <Button onClick={() =>toggleTokenModal('sell')}
          className="mt-3 rounded-4 btn-select-token ">{sellCurrency}</Button> {/* Need to create a Popup that shows a list of diff types of tokens*/}
          </div>
   
      </Form.Group>
      </div>


      <Form.Group className="mt-4 px-5" controlId="formBuy">
      <Form.Label className="text-white">Buy</Form.Label>
        <Form.Control 
        type='text'
        placeholder="0"
         className='py-3 rounded-4'
         onChange={inputChange} />
         <div>
          <Button onClick={() => toggleTokenModal('buy')}
           className="mt-3 rounded-4 btn-select-token ">{buyCurrency}</Button>
          </div>

      </Form.Group>
      </Form>
       <PopupMessage showModal={showPopup} closePopup={closePopup} />

       <TokenSelectModal
              showModal={showTokenModal}
              toggleModal={() => setShowTokenModal(false)}
              selectToken={handleSellTokenSelection}
              tokens={currencyData}
            />
       </div>
  )



}

export default ExchangeForm