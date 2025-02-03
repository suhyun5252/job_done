import { useEffect, useState } from "react";
import { reviewListState } from "../../atoms/reviewAtom";
import { ReviewDiv, StarTotalDiv } from "./serviceDetail";
import { useRecoilState, useRecoilValue } from "recoil";
import { businessDetailState } from "../../atoms/businessAtom";
import { FaStar, FaStarHalf } from "react-icons/fa";

const ContReview = () => {
  const [rating, setRating] = useState(4.2); // 별점
  const [reviewList, setReviewList] = useRecoilState(reviewListState);
  const businessDetail = useRecoilValue(businessDetailState);

  const businessId = 2;
  const page = 1;
  const size = 5;
  // 리뷰
  const getReviewList = async () => {
    try {
      const res = await axios.get(
        `/api/review?businessId=${businessId}&page=${page}&size=${size}`,
      );
      console.log("reviewList", res.data.resultData);
      setReviewList(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  // 별점
  const renderStars = () => {
    const fullStars = Math.floor(rating); // 채워진 별 개수
    const halfStar = rating % 1 >= 0.5; // 반쪽 별 여부
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // 비어 있는 별 개수

    return (
      <>
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={`full-${i}`} color="#EAB838" />
        ))}
        {halfStar && <FaStarHalf key="half" color="#EAB838" />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <FaStar key={`empty-${i}`} color="#E0E2E7" />
        ))}
      </>
    );
  };

  // console.log("reviewList--", reviewList);
  useEffect(() => {
    getReviewList();
  }, []);

  return (
    <>
      <StarTotalDiv>
        <h4>{businessDetail.businessName}</h4>
        <div className="star-container">
          <p className="star">{renderStars()}</p>
          <span className="star-grade"> {rating.toFixed(1)}</span>
        </div>
      </StarTotalDiv>
      <ReviewDiv>
        <div className="rv-top">
          <h3>서비스 리뷰 7,500</h3>
          <div className="filter">별점 낮은순 +</div>
        </div>
        {/* 리뷰리스트 */}
        <div className="rv-list">
          {reviewList.map((item, index) => (
            <div className="rv-item" key={index}>
              {/* 유저리뷰 */}
              <div className="user-rv">
                <div className="user-info">
                  <div className="user-photo">
                    {item.writerPic ? (
                      <img src={`${item.writerPic}`} alt={item.name} />
                    ) : (
                      <div>없을때 기본프로필</div>
                    )}
                  </div>
                  <div className="desc">
                    <div>
                      {renderStars(item.score)}
                      <span className="star-grade">
                        {item.score.toFixed(1)}
                      </span>
                      <b>{item.createdAt.slice(0, 10)}</b>
                    </div>
                    <h4>{item.name.slice(0, 1)}**</h4>
                  </div>
                </div>
                <div className="comment">
                  <span>{item.contents}</span>
                  <div className="photo">
                    {item.pics &&
                      item.pics.slice(0, 2).map((pic, index) => (
                        <div key={index}>
                          <img src={`${pic}`} alt="review-img" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/* 사장님댓글 */}
              <div className="reply">
                <div className="info">
                  <h4>{businessDetail.businessName}</h4> <b>20.01.24</b>
                </div>
                <div className="comment">
                  <span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eius voluptatem voluptate aut in, explicabo excepturi. Autem
                    incidunt earum explicabo tempore distinctio alias quae animi
                    enim sit numquam, perferendis provident quibusdam.
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* 리뷰 */}
        </div>
      </ReviewDiv>
    </>
  );
};

export default ContReview;
