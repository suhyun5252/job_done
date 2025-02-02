import React, { useState } from "react";
import MyPageLayout from "../../components/MyPageLayout";
import { IoIosCamera } from "react-icons/io";
import { HiOutlinePencilAlt, HiEye, HiEyeOff } from "react-icons/hi";

function MyPage() {
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("전화번호");
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deletePw, setDeletePw] = useState(false);

  return (
    <>
      <MyPageLayout>
        <div className="flex flex-col items-center gap-[50px]">
          <div className="text-[24px]">내 정보</div>
          <div className="relative">
            <img
              src="/images/order/default_profile.jpg"
              alt="profile"
              className="w-[100px] h-[100px] rounded-full"
            />
            <input
              id="imgUpload"
              type="file"
              accept="image/*"
              className="hidden"
            />
            <label
              htmlFor="imgUpload"
              className="absolute bottom-0 right-0 bg-white rounded-full text-[#1e1e1e] cursor-pointer w-[30px] h-[30px] flex justify-center items-center text-[24px]"
            >
              <IoIosCamera />
            </label>
          </div>
          <button className="flex justify-center items-center w-[50px] h-[30px] bg-white text-black rounded-[8px] border border-gray-300 hover:bg-black hover:text-white">
            적용
          </button>
          <div className="flex flex-col gap-[20px]">
            <div>
              <input
                type="text"
                value="이름"
                readOnly
                className="w-[300px] h-[40px] flex justify-center items-center rounded-[8px] border border-[#E4E5ED] px-3 text-[#C3C3C3]"
              />
            </div>
            <div>
              <input
                type="text"
                value="이메일"
                readOnly
                className="w-[300px] h-[40px] flex justify-center items-center rounded-[8px] border border-[#E4E5ED] px-3 text-[#C3C3C3]"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                readOnly={!isPhoneEdit}
                className="w-[300px] h-[40px] flex justify-center items-center rounded-[8px] border border-[#E4E5ED] px-3 text-[#C3C3C3]"
              />
              <button
                onClick={() => setIsPhoneEdit(!isPhoneEdit)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <HiOutlinePencilAlt />
              </button>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div>
                <button
                  className="text-[#737373] underline"
                  onClick={() => setIsPwModalOpen(true)}
                >
                  비밀번호 변경
                </button>
              </div>
              <div>
                <button
                  className="text-[#737373] underline"
                  onClick={() => setIsDeleteModal(true)}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>
      </MyPageLayout>

      {/* 비밀번호 변경 모달 */}
      {isPwModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-[18px] font-normal mb-4 flex justify-center items-center pb-[20px]">
              비밀번호 변경
            </h2>

            <div className="relative mb-3">
              <input
                type={showCurrentPw ? "text" : "password"}
                placeholder="현재 비밀번호"
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showCurrentPw ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <div className="relative mb-3">
              <input
                type={showNewPw ? "text" : "password"}
                placeholder="새 비밀번호"
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNewPw ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirmPw ? "text" : "password"}
                placeholder="새 비밀번호 확인"
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPw(!showConfirmPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPw ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-[10px]">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setIsPwModalOpen(false)}
              >
                취소
              </button>
              <button className="px-4 py-2 bg-[#3887FF] text-white rounded">
                변경하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 회원탈퇴 모달 */}
      {isDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <span className="text-[18px] font-normal mb-2 flex justify-center items-center">
              회원탈퇴
            </span>
            <div className="text-gray-600 text-sm mb-4 pt-[20px] pb-[10px]">
              <p>정말 탈퇴하시겠습니까?</p>
              <p>탈퇴하시려면 비밀번호를 입력해주세요.</p>
            </div>

            <div className="relative mb-4">
              <input
                type={deletePw ? "text" : "password"}
                placeholder="비밀번호 입력"
                className="w-full px-3 py-2 border rounded h-[40px]"
              />
              <button
                type="button"
                onClick={() => setDeletePw(!deletePw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777]"
              >
                {deletePw ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-[10px]">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setIsDeleteModal(false)}
              >
                취소
              </button>
              <button className="px-4 py-2 bg-[#FF3044] text-white rounded">
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyPage;
