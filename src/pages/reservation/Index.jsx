import { useEffect, useState } from "react";
import { LayoutDiv } from "../page";
import {
  BottomContDiv,
  BtnAreaCustomDiv,
  DateDiv,
  LeftContDiv,
  ReserVationContDiv,
  ReservationDiv,
  ReservationInfoDiv,
  RightContDiv,
  RoomSizeDiv,
  SelectOptionDiv,
  TimeDiv,
  TotalPriceDiv,
} from "./reservation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import moment from "moment";
// console.log(moment(startDate).format("YYYY-MM-DD"));
// yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// icon
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import UserReservation from "../../components/papers/UserReservation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
// 다음포스트
// import { useDaumPostcodePopup } from "react-daum-postcode";

const schema = yup.object({
  pyeong: yup.number(),
  totalPrice: yup.number(),
});

function Index() {
  const initData = {
    productId: 1,
    totalPrice: 0,
    lat: 0,
    lng: 0,
    address: "",
    comment: "",
    startDate: "",
    pyeong: "",
    options: [
      {
        optionDetailId: 0,
      },
    ],
    mstartTime: "",
  };
  const [formData, setFormData] = useState(initData);
  const [startDate, setStartDate] = useState(new Date());
  // 주소
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  // 옵션 선택
  const [selectOptions, setSelectOptions] = useState({});

  // console.log(selectOptions);
  // 예약상태
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const businessDetail = useRecoilValue(businessDetailState);
  const businessId = businessDetail.businessId;
  const [optionList, setOptionList] = useState([]);

  const [basicPrice, setBasicPrice] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPrices, setSelectedPrices] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      address: {
        basic: "",
        detail: "",
      },
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // 옵션가져오기
  const getOptionList = async businessId => {
    try {
      const res = await axios.get(`/api/product?businessId=${businessId}`, {
        params: { businessId: businessId },
      });
      console.log("여기", res.data.resultData.optionList);
      setOptionList(res.data.resultData.optionList);
      setBasicPrice(res.data.resultData.productPrice);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOptionList(businessId);
  }, []);
  console.log("optionList!!!", optionList);
  // console.log("optionList[0]!!!", optionList[0]);
  const onSubmit = data => {
    console.log(data);
    console.log("눌림");
    setReservationSubmitted(true);
  };

  const pyeongVal = watch("pyeong");

  const totalPrice2 =
    basicPrice + // 기본 금액
    Object.values(selectedPrices).reduce((sum, price) => sum + price, 0) +
    pyeongVal * 10000;

  const handleOptionChange = (productOptionId, optionPrice) => {
    setSelectedPrices(prev => {
      // 기존 선택된 값에서 productOptionId가 중복되지 않도록 필터링
      const updatedPrices = Object.keys(prev)
        .filter(key => key !== productOptionId) // 같은 productOptionId 제거
        .reduce((obj, key) => {
          obj[key] = prev[key];
          return obj;
        }, {});

      return {
        ...updatedPrices,
        [productOptionId]: optionPrice, // 새로운 값 추가
      };
    });
  };

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = ""; // 주소 변수
        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }
        // 상태 업데이트
        setAddress(addr);
        // 상세주소 입력 필드에 포커스
        document.getElementById("detailAddress").focus();
      },
    }).open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script); // 컴포넌트가 언마운트 될 때 스크립트 제거
    };
  }, []);

  useEffect(() => {
    // setTotalPrice(prev => prev + watch("pyeong") * 10000);
    // console.log("이거 뭔데", totalPrice);
    console.log("배열", totalPrice2);
    console.log("기본금액", basicPrice);
  }, [selectedPrices, pyeongVal]);

  if (reservationSubmitted) {
    return <UserReservation />;
  }
  const rsvTime = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ];

  return (
    <ReservationDiv>
      <LayoutDiv>
        <h2 className="tit">예약하기</h2>
        <ReserVationContDiv>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LeftContDiv>
              <DateDiv>
                <h3>날짜선택</h3>
                <p>
                  <b>*</b>서비스 받으실 날짜를 선택해주세요.
                </p>
                <DatePicker
                  selected={startDate}
                  onChange={date => {
                    setStartDate(date);
                    console.log(moment(date).format("YYYY-MM-DD"));
                  }}
                  locale={ko}
                  format="yyyy/MM"
                  dateFormat="yyyy-MM-dd"
                  inline
                />
              </DateDiv>
              <TimeDiv>
                <h3>시간 선택</h3>
                <div>
                  {/* <h4>오전</h4> */}
                  {rsvTime.map((item, index) => {
                    return (
                      <div key={index}>
                        <input
                          {...register("time")}
                          type="radio"
                          name="mstartTime"
                          id={`mstartTime-${index}`}
                          value={item}
                        />
                        <label for={`mstartTime-${index}`}>{item}</label>
                      </div>
                    );
                  })}
                </div>
              </TimeDiv>
              <ReservationInfoDiv>
                <h3>예약자 정보</h3>
                <label htmlFor="address">
                  <h4>주소</h4>
                  <input
                    {...register("addr")}
                    type="text"
                    className="addr"
                    id="address"
                    value={address}
                    readOnly
                  />
                  <button type="button" onClick={handlePostcodeSearch}>
                    주소검색
                  </button>
                </label>
                <label htmlFor="detailAddress">
                  <h4>상세주소</h4>
                  <input
                    {...register("addr-detail")}
                    type="text"
                    id="detailAddress"
                    placeholder="상세 주소를 입력해주세요"
                    value={detailAddress}
                    onChange={e => setDetailAddress(e.target.value)}
                  />
                </label>
                <RoomSizeDiv>
                  <h3>평수입력</h3>
                  <p>
                    <b>*</b>평당 10,000원 입니다.
                  </p>
                  <label>
                    <h4>평수</h4>
                    <input
                      type="number"
                      placeholder="평수를 숫자로 입력해주세요."
                      {...register("pyeong")}
                    />
                  </label>
                </RoomSizeDiv>
              </ReservationInfoDiv>
            </LeftContDiv>
            <RightContDiv>
              <SelectOptionDiv>
                <h3>옵션선택</h3>
                <div>
                  {optionList.map((option, index) => (
                    <div key={index}>
                      <h4>{option.optionName}</h4>
                      <div className="option-list">
                        {option.optionDetailList.map(item => (
                          <label
                            htmlFor={item.optionDetailId}
                            key={item.optionDetailId}
                          >
                            <input
                              type="radio"
                              name={`option-${option.productOptionId}`} // 같은 productOptionId 내 하나만 선택 가능
                              id={item.optionDetailId}
                              onChange={() =>
                                handleOptionChange(
                                  option.productOptionId,
                                  item.optionDetailPrice,
                                )
                              }
                              checked={
                                selectedPrices[option.productOptionId] ===
                                item.optionDetailPrice
                              }
                            />
                            <em>
                              <i>
                                {selectedPrices[option.productOptionId] ===
                                item.optionDetailPrice ? (
                                  <BsCheckCircleFill className="text-[#34A5F0]" />
                                ) : (
                                  <BsCircle className="text-[#333]" />
                                )}
                              </i>
                              <b>{item.optionDetailName}</b>
                            </em>
                            <span>
                              {item.optionDetailPrice.toLocaleString()}원
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SelectOptionDiv>
              <TotalPriceDiv>
                <h3>예상금액</h3>
                <div>
                  <h4>총금액</h4>
                  <p>{totalPrice2.toLocaleString()}원</p>
                </div>
              </TotalPriceDiv>
            </RightContDiv>
            <BottomContDiv>
              <div>
                <h3>문의사항</h3>
                <textarea
                  name=""
                  id=""
                  placeholder="궁금한 점이나 업체에 남기고 싶은 말을 적어주세요."
                ></textarea>
              </div>
            </BottomContDiv>
            <BtnAreaCustomDiv>
              <button className="cancel" type="button">
                뒤로가기
              </button>
              <button className="confirm" type="submit">
                예약하기
              </button>
            </BtnAreaCustomDiv>
          </form>
        </ReserVationContDiv>
      </LayoutDiv>
    </ReservationDiv>
  );
}
export default Index;
