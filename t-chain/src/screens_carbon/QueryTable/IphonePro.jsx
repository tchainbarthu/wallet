import React, { useEffect, useState } from 'react';
import { Description } from "../../components/Description";
import { Language } from "../../components/Language";
import { QueryTime } from "../../components/QueryTime";
import { Sbumit } from "../../components/Sbumit";
import { TableHead } from "../../components/TableHead";
import { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { useAddress } from "../../Contexts/AddressContext";

import { TableRow } from "../../components/TableRow";
import { useNavigate } from 'react-router-dom';

import { Label } from "../../components/Label";
// import { }
import "./style.css";
// import { DATABASE_ROOT } from "../../config";

import { useLoginRedirect } from '../../loginAuth';
import { InputText } from "../../components/InputText";

import { WaitingPage } from '../WaitingPage';

import { LanguageContext } from "../../Language/LanguageContext";
const DATABASE_ROOT=window.TCHAIN_DATABASE_ROOT;
function getDateStr(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so add 1 and format as 2 digits
  const day = ("0" + date.getDate()).slice(-2); // Format as 2 digits
  const formattedDate = `${year}${month}${day}`;
  return formattedDate;
}

function sec2time(timeInSeconds) {
  const date = new Date(timeInSeconds);
const year = date.getFullYear();
const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
const day = ("0" + date.getDate()).slice(-2);
const formattedDate = `${year}-${month}-${day}`;
return formattedDate;
}

const fetchData = async (dateType, setData, address, startDate, endDate) => {
  
  let url;

  switch (dateType) {
    case 'thisDay':
      url = `${DATABASE_ROOT}/fetch-today-transfers`;
      break;
    case 'thisMonth':
      url = `${DATABASE_ROOT}/fetch-month-transfers`;
      break;
    case 'specifyTimeRange':
      url = `${DATABASE_ROOT}/fetch-slot-transfers`;
      break;
    default:
      url = `${DATABASE_ROOT}/fetch-today-transfers`
      break;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ originalAddress: address, startDate: startDate, endDate: endDate}),
  })
    .catch((error) => {
      console.error('Error:', error);
    });

  if (response && !response.ok) {
    console.error('Error:', response.status, response.statusText);
    return;
  }

  if (response){
    const data = await response.json();
    console.log(data)
    setData(data);
  }

};

function hexToDecimal(hexString) {
  return parseInt(hexString, 16);
}

function backHome(navigate) {
  // navigate('/account/CarbonA');
  navigate(-1);
}
export const QueryTable = () => {
  useLoginRedirect();
  const [queryType, setQueryType] = useState('thisDay');
  const { address, setAddress } = useAddress();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 6;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  useEffect(() => {
    fetchData(queryType, setData, address, startDate, endDate);
  }, []); // Empty dependency array ensures this runs once on mount
  // const [selectedDate, setSelectedDate] = useState('');
  const offset = currentPage * PER_PAGE;

  const currentPageData = data
    .slice(offset, offset + PER_PAGE)
    .map((item, i) => <div key={i}>{
      <TableRow
        className={`table-row-instance-${i} ${queryType === 'specifyTimeRange' ? 'put-down' : ''}`}
        TXBash={item.txhash}
        targetAddress={item.targetAddress}
        Amount={hexToDecimal(item.hexadecimal_amount) / 1000000000}
        Time={sec2time(item.transferTime)}
        Result={item.success ? 'Success' : 'Fail'}
      />
    }</div>);

  const pageCount = Math.ceil(data.length / PER_PAGE);
  const { language ,translations } = useContext(LanguageContext);
  return (
    <div className="iphone-pro-querytable">
      <div className="div-2">
        {/* <div className="overlap-4">
          <img className="little-robot" alt="Little robot" src="/img/little-robot-1.png" onClick={()=>{backHome(navigate)}}/>
          <div className="overlap-5">
            <Language className="language-instance" property1="default" />
            <Description className="description-instance" property1="chinese" textKey='description'/>
          </div>
        </div> */}
        
        <div className={`title ${language}`}>{translations['transfer_record']}</div>
        <div className="TimeHead">{translations['time']}</div>
        {/* <img src="/svg/query_builder.svg" className="query-time"></img> */}
        <img src="/svg/Vector.svg" alt="Vector-back" className="vector-back" onClick={()=>{backHome(navigate)}}/>
        <Language className="language-instance-2" property1="default" />
        <Sbumit className={`sbumit-instance ${language}`} ClassName="design-component-instance-node" textKey="submitQuery" onClick={
          () => fetchData(queryType, setData, address, startDate, endDate)
        
        }/>
        {/* <TableHead className={`table-head-instance ${queryType === 'specifyTimeRange' ? 'put-down' : ''}`} /> */}
        
        {
          queryType === 'specifyTimeRange' &&
          <InputText className="input-text-2" textKey="startDate" inputType="date" disabled={queryType !== 'specifyTimeRange'}  onChange={
            (e) => {
              const formattedDate = getDateStr(new Date(e.target.value));
              setStartDate(formattedDate)
            // console.log('lockAmount', lockAmount);
          }
          }/>
        }
        {
          queryType === 'specifyTimeRange' &&
          <InputText className="input-text-3" textKey="endDate" inputType="date" disabled={queryType !== 'specifyTimeRange'}  onChange={
            (e) => {
              const formattedDate = getDateStr(new Date(e.target.value));
              setEndDate(formattedDate)
            // console.log('lockAmount', lockAmount);
          }
          }/>
        }
        {
          queryType === 'specifyTimeRange' &&
          <Label className="label-4" textKey="startDate" />
        }
        {
          queryType === 'specifyTimeRange' &&
          <Label className="label-5" textKey="endDate" />
        }
        {currentPageData}
        <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={({ selected: selectedPage }) => setCurrentPage(selectedPage)}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      <QueryTime className="query-time-instance" property1="default" queryType={queryType} setQueryType={setQueryType}  />
      </div>
    </div>
  );
};
