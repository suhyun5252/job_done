import React, { useState } from "react";
import {
  businessInfo,
  checkMsg,
  numDubCheck,
} from "../../../atoms/businessAtom";
import { useRecoilState } from "recoil";

import { Form, Button, Image, Upload, Input } from "antd";
import "./businessnumber.css";
import { useNavigate } from "react-router-dom";
function BusinessNumber() {
  const [form] = Form.useForm();
  const [result, setResult] = useState(null); // 결과를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지를 저장할 상태

  const [busiInfo, setBusiInfo] = useRecoilState(businessInfo);
  const [numModal, setNumMOdal] = useRecoilState(numDubCheck);
  const [fileList, setFileList] = useState([]); // 파일 상태
  const [previewImages, setPreviewImages] = useState([]); // 이미지 미리보기 상태
  const [checkMessage, setCheckMessage] = useRecoilState(checkMsg);
  const navigate = useNavigate();
  const sucess = () => {
    setNumMOdal(false);
    navigate("/");
  };
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);

    // 이미지 미리보기 URL 생성
    const previews = fileList.map(file =>
      file.originFileObj ? URL.createObjectURL(file.originFileObj) : file.url,
    );
    setPreviewImages(previews);
  };

  const fetchBusinessStatus = async data => {
    console.log(data);
    setCheckMessage(true);
    try {
      const response = await fetch(
        "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=SYnAPANxYlrtHeae0VoAU1DN2akTqdFZEu4CQCywJBBHl7Ta0O1OH9jceiUbdJ0U%2BVtnIL%2BFWRemuJIT1UvLfg%3D%3D",
        // ", // 실제 서비스 키로 대체
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ b_no: [data] }),
        },
      );
      const result = await response.json();
      if (result) {
        setResult(result);
      }
      console.log(result);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setCheckMessage(false);
    }
  };
  // 업체 최종 등록
  const onSubmit = async data => {
    try {
      const formData = new FormData();

      const requestData = {
        userId: data.userId,
        businessNum: "",
        businessName: data.businessName,
        address: data.address,
        serviceTypeId: data.serviceTypeId,
        busiCreatedAt: data.busiCreatedAt,
        tel: data.tel,
      };

      // JSON 데이터를 FormData에 추가
      formData.append(
        "p",
        new Blob([JSON.stringify(requestData)], {
          type: "application/json",
        }),
      );

      // 파일 추가 (data.pic이 있는 경우)
      if (data.paper) {
        formData.append("pic", data.pic);
      }

      // `Content-Type` 헤더는 설정하지 않음 (자동 설정)
      const res = await axios.post("/api/business/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        setNumMOdal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form
        form={form}
        initialValues={busiInfo}
        onFinish={onSubmit}
        style={{ width: 320, margin: "0 auto", display: "block" }}
      >
        <Form.Item
          name="businessNum"
          label="사업자 등록 번호"
          rules={
            checkMessage
              ? [
                  { required: true, message: "사업자 등록 번호를 입력하세요." },
                  {
                    pattern: /^\d{8,10}$/,
                    message: "사업자 등록 번호 형식이 잘못되었습니다.",
                  },
                ]
              : [
                  {
                    pattern: /^\d{8,10}$/,
                    message: "중복된 사업자 등록 번호 입니다.",
                  },
                ]
          }
        >
          <Input
            placeholder="사업자 등록 번호를 입력하세요."
            suffix={
              <Button
                type="button"
                onClick={() => {
                  const number = form.getFieldValue("businessNum");
                  fetchBusinessStatus(number);
                }}
                className="bg-blue-500 border border-gray-400 w-20 h-6 rounded-lg  "
              >
                조회
              </Button>
            }
          />
        </Form.Item>
        {result && <pre>{result.data && result.data[0]?.tax_type}</pre>}
        {error && <p style={{ color: "red" }}>{error.data.tax_type}</p>}

        <Form.Item
          label="사업자 등록증"
          name={"pic"}
          rules={[{ required: false }]}
        >
          <Upload
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleFileChange}
            maxCount={3}
          >
            <Button>사진/파일첨부</Button>
          </Upload>
        </Form.Item>
        {/* 미리보기 */}

        {previewImages.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>미리보기:</h3>
            {previewImages.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`미리보기 ${index}`}
                style={{ width: "100%", height: 160, marginRight: 10 }}
              />
            ))}
          </div>
        )}
        <Form.Item className="clickbuttons">
          <button className="cancle" onClick={() => goCancle()}>
            취소
          </button>
          <Button htmlType="submit" className="nextButton">
            다음
          </Button>
        </Form.Item>
      </Form>
      {numModal && (
        <div className="num-ModalFull items-center justify-center">
          <div className="num-Modal">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 30,
                marginTop: 20,
              }}
            >
              <h1>등록이 완료되었습니다.</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={() => sucess}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessNumber;
