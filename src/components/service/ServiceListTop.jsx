import { IoSearch } from "react-icons/io5";
import { BiSolidRightArrow } from "react-icons/bi";
import { PageTopDiv } from "./service";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedCategoryState,
  selectedDetailTypeState,
  regionState,
  categoryList,
  detailList,
} from "../../atoms/categoryAtom";

const ServiceListTop = ({ setBusinessList }) => {
  const [regionId, setRegionId] = useRecoilState(regionState); // 전체 기본

  const regionIdVal = useRecoilValue(regionState);
  const categoryId = useRecoilValue(selectedCategoryState);
  const detailTypeId = useRecoilValue(selectedDetailTypeState);
  const [categoryDatas, setCategoryDatas] = useRecoilState(categoryList);
  const [detailDatas, setDetailDatas] = useRecoilState(detailList);
  const cateName = categoryDatas.find(
    item => item.categoryId === categoryId,
  )?.categoryName;
  const detailName =
    Object.values(detailDatas)
      .flat()
      .find(item => item.detailTypeId === detailTypeId)?.detailTypeName || "";

  const [searchTerm, setSearchTerm] = useState("");

  // 중복 요청을 막는 새로운 함수
  const handleSearchOrRegionClick = async (
    categoryId,
    detailTypeId,
    regionIdVal,
    searchTerm,
  ) => {
    console.log(categoryId, detailTypeId, regionIdVal, searchTerm);

    let url = "/api/business?";

    // categoryId가 있으면 추가
    if (categoryId !== undefined && categoryId !== null) {
      url += `categoryId=${categoryId}&`;
    }

    // detailTypeId가 있으면 추가
    if (detailTypeId !== undefined && detailTypeId !== null) {
      url += `detailTypeId=${detailTypeId}&`;
    }

    // regionIdVal가 있으면 추가
    if (regionIdVal !== undefined && regionIdVal !== null) {
      url += `regionId=${regionIdVal}&`;
    }

    // searchTerm이 있으면 추가
    if (searchTerm !== undefined && searchTerm.trim() !== "") {
      url += `searchTerm=${searchTerm}&`;
    }

    // 마지막 '&' 제거
    url = url.endsWith("&") ? url.slice(0, -1) : url;

    try {
      const res = await axios.get(url);
      console.log("검색 결과:", res.data.resultData);

      setBusinessList(res.data.resultData);
      setFilteredBusinessList(res.data.resultData);
    } catch (error) {
      console.log("검색 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    // 최초 로딩 시 regionId, categoryId, detailTypeId에 따라 검색
    handleSearchOrRegionClick(categoryId, detailTypeId, regionId, searchTerm);
  }, [categoryId, detailTypeId, regionId, searchTerm]);

  return (
    <PageTopDiv>
      <div className="inner">
        <h1>{cateName}</h1>
        <span>
          {cateName} {detailTypeId >= 1 ? <BiSolidRightArrow /> : ""}
          {detailName}
        </span>
        <ul>
          <li>
            <button
              to="/service"
              onClick={() =>
                handleSearchOrRegionClick(
                  categoryId,
                  detailTypeId,
                  undefined,
                  searchTerm,
                )
              }
              className={regionId === undefined ? "active" : ""}
            >
              전체
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleSearchOrRegionClick(
                  categoryId,
                  detailTypeId,
                  1,
                  searchTerm,
                )
              }
              className={regionId === 1 ? "active" : ""}
            >
              대구
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleSearchOrRegionClick(
                  categoryId,
                  detailTypeId,
                  2,
                  searchTerm,
                )
              }
              className={regionId === 2 ? "active" : ""}
            >
              부산
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleSearchOrRegionClick(
                  categoryId,
                  detailTypeId,
                  3,
                  searchTerm,
                )
              }
              className={regionId === 3 ? "active" : ""}
            >
              포항
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleSearchOrRegionClick(
                  categoryId,
                  detailTypeId,
                  4,
                  searchTerm,
                )
              }
              className={regionId === 4 ? "active" : ""}
            >
              경주
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleSearchOrRegionClick(
                  categoryId,
                  detailTypeId,
                  5,
                  searchTerm,
                )
              }
              className={regionId === 5 ? "active" : ""}
            >
              구미
            </button>
          </li>
        </ul>
        <div className="search">
          <em>
            <IoSearch />
          </em>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchOrRegionClick(
                  categoryId,
                  detailTypeId,
                  regionId,
                  searchTerm,
                );
              }
            }}
          />
          <button
            className="search-btn"
            onClick={() =>
              handleSearchOrRegionClick(
                categoryId,
                detailTypeId,
                regionId,
                searchTerm,
              )
            }
          >
            검색
          </button>
        </div>
      </div>
    </PageTopDiv>
  );
};
export default ServiceListTop;
