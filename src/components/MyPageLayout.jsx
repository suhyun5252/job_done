import React from "react";
import { Link } from "react-router-dom";

function MyPageLayout({ children }) {
  return (
    <div className="flex max-w-[1280px] m-auto pt-[80px]">
      <div className="w-[250px]">
        <div className="flex flex-col gap-[100px]">
          <div className="flex justify-center items-center text-[36px]">
            마이페이지
          </div>
          <div className="flex justify-center items-center">
            <img
              src="/images/order/default_profile.jpg"
              alt="로고"
              className="w-[100px] h-[100px] rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-[10px]">
            <span>이메일</span>
            <span>전화번호</span>
          </div>
          <ul className="flex flex-col justify-center items-center gap-[40px] text-[24px]">
            <li>
              <Link to="/mypage" className="text-[#616161]">
                내 정보
              </Link>
            </li>
            <li>
              <Link to="/mypage/reservation" className="text-[#616161]">
                예약현황
              </Link>
            </li>
            <li>
              <Link to="/mypage/usage" className="text-[#616161]">
                이용내역
              </Link>
            </li>
            <li>
              <Link to="/mypage/wishlist" className="text-[#616161]">
                찜목록
              </Link>
            </li>
            <li>
              <Link to="/mypage/message" className="text-[#616161]">
                메시지함
              </Link>
            </li>
            <li>
              <Link to="/mypage/review" className="text-[#616161]">
                리뷰 관리
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

export default MyPageLayout;
