import Image from "next/image";
import { useEffect, useState } from "react";
import { graph } from "./Clothes";

import { getItemFromLocalStorage, setItemtoLocalStorage } from "./utils";

const Container = ({}) => {
  // States
  let [show, setshow] = useState(true);
  let [showClothTypeSelection, setShowClothTypeSelection] = useState(false);
  let [currentSelectTedFashionPart, setcurrentSelectTedFashionPart] = useState("torso");

  let [userSelection, setuserSelection] = useState({
    gender: "men",
    head: { type: "", color: "#f1f5f9" },
    torso: { type: "Round Neck Tshirt", color: "#f1f5f9" },
    pants: { type: "Jeans", color: "#808080" },
    accessories: { type: "", color: undefined },
    shoes: { type: "Low Top Sneakers", color: "#000000" },
  });

  let [outfitType, setoutfitsType] = useState([
    { type: "head", height: "h-1/6", toShow: false },
    { type: "torso", height: "h-2/6", toShow: true },
    { type: "pants", height: "h-3/6", toShow: true },
    { type: "shoes", height: "h-1/6", toShow: true },
  ]);

  let [genderOutfits, setgenderOutfits] = useState({
    men: {
      items: ["Torso", "Pants", "Shoes", "Accessories"],
      torso: ["Round Neck Tshirt", "Hoodie", "Full Sleeves Tshirt", "Shirt"],
      pants: ["Jeans", "Cargo", "Chinos", "Tracks"],
      shoes: ["Low Top Sneakers", "High Top Sneakers", "Chelsea", "Sport Shoes", "Boots"],
    },
    women: {
      items: ["Torso", "Pants", "Shoes", "Accessories"],
      head: ["Earring"],
      torso: ["Round Neck Tshirt", "V Neck Tshirt", "Hoodie", "Full Sleeves Tshirt", "Shirt"],
      pants: ["Jeans", "Cargo", "Chinos", "Tracks"],
      shoes: ["Heels", "Low Top Sneakers", "High Top Sneakers", "Chelsea", "Sport Shoes", "Boots"],
    },
  });

  // Functions
  const clickInput = id => document.getElementById(id).click();

  const handleGenderChange = value => {
    setuserSelection(previousSelections => ({ ...previousSelections, gender: value }));
    setItemtoLocalStorage("userSelection", { ...userSelection, gender: value });
  };

  const handleClothesSelectionModal = selectTedFashionPart => {
    setShowClothTypeSelection(true);
    setcurrentSelectTedFashionPart(selectTedFashionPart);
  };
  const handleDetailedClothesSelectionModal = (key, value) => {
    setuserSelection(previousSelection => ({ ...previousSelection, [key]: { type: value, color: previousSelection[key]?.color } }));
    setItemtoLocalStorage("userSelection", { ...userSelection, [key]: { type: value, color: userSelection[key]?.color } });

    setShowClothTypeSelection(false);
  };

  const handleColourChange = e => {
    let { name, value } = e.target;

    setuserSelection(previousSelection => ({ ...previousSelection, [name]: { type: previousSelection[name].type, color: value } }));
    setItemtoLocalStorage("userSelection", { ...userSelection, [name]: { type: userSelection[name].type, color: value } });

    reloadClothes();
  };

  const reloadClothes = () => {
    setshow(false);
    setTimeout(() => setshow(true), 0);
  };

  const handleDialogue = () => {
    setItemtoLocalStorage("Speech", true);

    setTimeout(() => {
      alert("You can click the magic wand (Beside the 'Hackfest Designs' title) to reset the outfits.");
    }, 20000);
    setTimeout(() => {
      alert("You can try out different outfits as per your choice.\n Also you can change their colours by clicking on them or the small handles on left side of window.");
    }, 4000);
  };

  const handlePageLoadUtilities = () => {
    if (getItemFromLocalStorage("Speech") == undefined) handleDialogue();
    if (getItemFromLocalStorage("userSelection")) setuserSelection(previousSelection => ({ ...previousSelection, ...getItemFromLocalStorage("userSelection") }));
  };

  useEffect(() => handlePageLoadUtilities(), []);

  return (
    <div className=' w-full h-auto lg:h-full flex flex-col items-center justify-center m-0 bg-sky-50 relative'>
      <div className='m-0 w-full h-full lg:py-12 lg:items-center lg:justify-center lg:flex' style={{ width: "100vw", height: "100vh", margin: "0" }}>
        <div className='m-0 h-full lg:flex lg:flex-row flex flex-col w-full lg:w-11/12 lg:items-center lg:justify-center lg:px-6'>
          <div className='m-0 w-full py-4 lg:hidden items-center justify-center flex font-#000000 text-2xl uppercase Quivera'>
            <div className='flex items-center  w-2/6 justify-around'>
              <Image width='0' height='10' onClick={() => localStorage.clear()} className='w-1/6 mr-auto icon z-50' src='/magic-wand.svg' alt='' />
              <div className='m-0 select-none'>Hackfest Designs</div>
            </div>
          </div>

          <div className='m-0 w-full py-4 lg:fixed  lg:block hidden items-center justify-center top-0 font-#000000 text-2xl uppercase Quivera'>
            <div className='flex items-center   w-1/6 justify-center'>
              <Image width='0' height='10' className='w-1/6 mr-auto lg:mr-6 icon ' onClick={() => localStorage.clear()} src='/magic-wand.svg' alt='' />
              <div className='m-0 lg:text-4xl'>Hackfest Designs</div>
            </div>
          </div>

          <div className=' m-0 h-auto lg:w-1/6 w-full flex items-center justify-evenly lg:flex-col lg:h-2/6'>
            <div className={`lg:shadow-xl flex items-center justify-center px-8 py-2 rounded-xl font-#000000 text-md hover:bg-blue-200 hover:border-blue-700 hover:text-blue-700 duration-300 ${userSelection.gender == "men" ? " bg-blue-200 border-blue-700 text-blue-700 " : " bg-gray-200 border-gray-700 text-gray-700 "}`} onClick={() => handleGenderChange("men")}>
              Men
            </div>
            <div className={`lg:shadow-xl flex items-center justify-center px-8 py-2 rounded-xl font-#000000 text-md hover:bg-blue-200 hover:border-blue-700 hover:text-blue-700 duration-300 ${userSelection.gender == "women" ? " bg-blue-200 border-blue-700 text-blue-700 " : " bg-gray-200 border-gray-700 text-gray-700 "}`} onClick={() => handleGenderChange("women")}>
              Woman
            </div>
          </div>
          <div className='m-0 h-5/6 p-0 flex flex-row items-center lg:h-5/6 lg:w-5/6 '>
            <div className=' m-0 w-1/12 h-full flex flex-col items-center '>
              {outfitType.map((eachObject, index) => {
                let { type, height, toShow } = eachObject;
                return (
                  <div key={Math.random().toString()} className={`flex items-center justify-start w-full ${height} ${!toShow ? " invisible " : ""} my-1 lg:w-1/2`}>
                    <input className='m-0 bg-transparent rounded-full w-1/2 h-3 border-#000000 ' type='color' name={type} id={type} value={userSelection[type]?.color} onChange={e => handleColourChange(e)} />
                  </div>
                );
              })}
            </div>
            <div className=' m-0 w-full  h-full flex flex-col items-center justify-center border-gray-300'>
              <div className='m-0 bg-blue-30  z-30 w-full h-1/6 mt-1 flex items-center justify-center bg-orange-' onClick={() => clickInput("head")}>
                {show && graph[userSelection?.head?.type]}
              </div>
              <div className='m-0 bg-blue-30  z-20 w-full h-2/6 mt-1 flex items-center justify-center' onClick={() => clickInput("torso")}>
                {show && graph[userSelection?.torso?.type]}
              </div>
              <div className='m-0 bg-blue-30 bg-sky-50 pt-2 z-30 w-full h-3/6 mt-1 flex items-center justify-center' onClick={() => clickInput("pants")}>
                {show && graph[userSelection?.pants?.type]}
              </div>
              <div className='m-0 bg-blue-30 z-40  w-full h-1/6 mt-1 flex items-center justify-center' onClick={() => clickInput("shoes")}>
                {show && graph[userSelection?.shoes?.type]}
              </div>
            </div>
          </div>
          <div className='m-0 h-1/6 mt-10 z-0 flex items-center overflow-y-auto  lg:hidden lg:w-2/6 lg:grid-cols-2 lg:h-5/6 lg:overflow-y-auto gap-4 px-2 '></div>
          <div className='m-0 h-auto pb-2 fixed w-full lg:relative z-20 bottom-0  flex items-center  overflow-y-auto  lg:grid lg:w-2/6 lg:grid-cols-2 lg:h-5/6 lg:overflow-y-auto gap-4 px-2 border-t-1 lg:border-0 pt-2 shadow-xl'>
            {Object.keys(genderOutfits[userSelection.gender]).map(eachFashionPart => {
              if (eachFashionPart == "items") return;
              return (
                <div key={Math.random().toString()} onClick={() => handleClothesSelectionModal(eachFashionPart)} className={`w-auto lg:py-8 lg:my-2 px-12 mx-1 h-3/4 rounded-lg items-center justify-center flex font-#000000 hover:border-0 text-sm lg:w-full lg:m-0 lg:p-0 item lg:h-full #f1f5f9space-nowrap hover:bg-blue-200 hover:border-blue-700 hover:text-blue-700 duration-300 ${userSelection[currentSelectTedFashionPart] == eachFashionPart ? " bg-sky-50 border-blue-700 text-blue-700 " : " rounded-xl  border-gray-300 "} flex-col`}>
                  <Image width='0' height='10' className='m-0 w-8 h-auto icon pb-1 lg:p-0 lg:w-20' src={`/${eachFashionPart.toString().toLowerCase().split(" ").join("-")}.svg`} alt='' />
                  <div className=' text-gray-600 m-auto uppercase text-xs whitespace-nowrap'>{eachFashionPart}</div>
                </div>
              );
            })}
          </div>

          {showClothTypeSelection && (
            <div className='m-0 flex fixed  bottom-0 left-0 right-0 items-end lg:items-center justify-end h-1/5  rounded-t-xl rounded-b-none lg:right-0 lg:top-0 lg:ml-auto  lg:bottom-0 lg:w-1/6 lg:h-full lg:rounded-r-xl rounded-xl border-t-2 lg:border-0 border-slate-300 bg-white shadow-xl lg:shadow-xk highest z-50'>
              <button className='m-0 flex items-center justify-center absolute top-3 right-3 font-#000000 text-#000000 lg:left-3 lg:top-3 lg:justify-start text-sm' onClick={() => setShowClothTypeSelection(false)}>
                X
              </button>
              <div className='m-0 h-4/6 flex items-center overflow-x-auto lg:overflow-x-hidden lg:flex-col lg:w-full lg:px-2 lg:overflow-y-auto  w-full rounded-lg shadow-inne pb-5'>
                {genderOutfits[userSelection.gender][currentSelectTedFashionPart].map(eachFashionPartDetailed => {
                  if (eachFashionPartDetailed == "items") return;
                  return (
                    <div key={Math.random().toString()} onClick={() => handleDetailedClothesSelectionModal(currentSelectTedFashionPart, eachFashionPartDetailed)} className={`w-auto lg:py-8 lg:my-2 px-12 mx-1 h-3/4 rounded-lg items-center justify-center flex font-#000000 hover:border-0 text-sm lg:w-full lg:m-0 lg:p-0 item lg:h-full #f1f5f9space-nowrap hover:bg-blue-200 hover:border-blue-700 hover:text-blue-700 duration-300 ${userSelection[currentSelectTedFashionPart] == eachFashionPartDetailed ? "  " : " rounded-xl  border-gray-300 "} flex-col`}>
                      <Image width='0' height='10' className='m-0 w-16 h-5/6 icon ' src={`/${eachFashionPartDetailed.toString().toLowerCase().split(" ").join("-")}.svg`} alt='' />
                      <div className=' text-gray-600 m-auto flex flex-col items-center justify-center'>
                        <div className='m-0 flex items-center justify-center bg-orange-40 uppercase lg:pt-2 text-xs pt-2 whitespace-nowrap'>{eachFashionPartDetailed}</div>
                        <div className='m-0 flex items-center justify-center bg-green-60 font-black text-2xl text-green-600'>{userSelection[currentSelectTedFashionPart] == eachFashionPartDetailed ? "." : ""}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Container;
