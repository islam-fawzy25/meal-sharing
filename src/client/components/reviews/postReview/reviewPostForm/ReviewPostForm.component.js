import React, { useState } from "react";
import "./ReviewPostForm.style.css";
import { Button } from "react-bootstrap";
import GenaricButton from "../../../GenericButton/GenericButton.component"
import SimpleRating from "../ControllredRating.component"

export default function PostReviewForm({
    isReviewed,
    setIsReviewed,
    handleReviewOnClick,
    newReview,
    reviewTitle,
    setReviewTitle,
    reviewDescription,
    setReviewDescription,
    reviewUserEmail,
    setReviewUserEmail,
    reviewUserName,
    setReviewUserName,
    reviewStars,
    setReviewStars,
}) {

    return (
        <div className={`review-form-container`} >
            {isReviewed && <div className="review-message">
                <div >Thanks for review</div> <br />
                <GenaricButton title="Make new review" handleOnClick={handleReviewOnClick} />
            </div>}
            {!isReviewed &&
                <div className="review-form" >
                    <form onSubmit={newReview}>
                        <h3>Make review</h3>
                        <input
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                            placeholder="Review title"
                            type="text"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                        <hr />
                        <textarea
                            value={reviewDescription}
                            onChange={(e) => setReviewDescription(e.target.value)}
                            placeholder="Review description"
                            rows="4"
                            cols="23"

                            required
                        />
                        <hr />

                        <input
                            value={reviewUserEmail}
                            onChange={(e) => setReviewUserEmail(e.target.value)}
                            placeholder="Enter your email"
                            type="email"
                            required
                        />
                        <hr />

                        <input
                            value={reviewUserName}
                            onChange={(e) => setReviewUserName(e.target.value)}
                            type="text"
                            placeholder="Enter your name"
                            minLength="2"
                            maxLength="50"
                            required
                        />
                        <hr />
                        <div>
                            < SimpleRating
                                reviewStars={reviewStars}
                                setReviewStars={setReviewStars}
                            />
                        </div>
                        <hr />
                        <div className="d-grid gap-2 ">
                            <Button type="submit" variant="secondary" size="lg">
                                Review
                            </Button>
                        </div>
                    </form >
                </div>
            }
        </div>
    );
};



