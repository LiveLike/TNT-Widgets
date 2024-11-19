"use client"

import React, { useEffect, useState, useRef } from "react";

import { TNTImageSlider } from "./emojiSlider/emoji-slider";
import { TNTImageNumberPrediction } from "./imageNumberPrediction/image-number-prediction";
import { TntImageQuiz } from "./image-quiz/image-quiz";
import { TntTextPoll } from "./text-poll/text-poll";
import { TNTImageNumberPredictionFollowUp } from "./imageNumberPrediction/image-number-prediction-follow-up";
import { TNTImageNumberPredictionOption } from "./imageNumberPrediction/image-number-prediction-option";
import { TNTCheerOption } from "./cheer-meter/cheer-option";
import TNTMatchCenter from "./match-center/TNTMatchCenter";
import { TNTCheerMeter } from "./cheer-meter";
import "../index.css";
import "../../assets/fonts/font.css";
import  LiveLike, { applyLocalization }  from "@livelike/engagementsdk";
import { TntTextAsk } from "./text-ask";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'tnt-image-quiz': React.DetailedHTMLProps<React.HTMLAttributes<TntImageQuiz>, TntImageQuiz> & {
                widgetId: string;
            };
            'tnt-image-number-prediction': React.DetailedHTMLProps<React.HTMLAttributes<TNTImageNumberPredictionOption>, TNTImageNumberPredictionOption> & {
                widgetId: string;
            };
            'tnt-text-poll': React.DetailedHTMLProps<React.HTMLAttributes<TntTextPoll>, TntTextPoll> & {
                widgetId: string;
            };
            'tnt-text-ask': React.DetailedHTMLProps<React.HTMLAttributes<TntTextAsk>, TntTextAsk> & {
                widgetId: string;
            };
        }
    }
}

export const LiveLikeNumberPredictionComponent = React.memo(() => {
    const effectInvokedRef = useRef(false);
    useEffect(() => {
        if (!effectInvokedRef.current) {
            
            const intiLiveLike = async () => {
                await LiveLike.init({ clientId: 'TDPcjbTEZrpZioRSZPaRy4jRw0Kck01t6i4bJFjk' });
            }

            if (typeof window !== 'undefined') {

                
                intiLiveLike();
                LiveLike.applyLocalization({
                    en: {
                      "widget.submit": "Submit",
                      "widget.submitted": "Submitted",
                      "widget.submitted.expired": "Submitted Expired",
                      "widget.expired": "Expired",
                      "widget.quiz.voteButton.label": "Submit",
                      "widget.quiz.votedText": "Submitted!"
                    }
                })
                  
                customElements.define(
                    "tnt-image-quiz",
                    TntImageQuiz as any
                );

                customElements.define(
                    "tnt-image-number-prediction-option",
                    TNTImageNumberPredictionOption as any
                );

                customElements.define(
                    "tnt-image-number-prediction",
                    TNTImageNumberPrediction as any
                );


                customElements.define(
                    "tnt-image-number-prediction-follow-up",
                    TNTImageNumberPredictionFollowUp as any
                );

                customElements.define(
                    "tnt-emoji-slider",
                    TNTImageSlider as any
                );

                customElements.define(
                    "tnt-cheer-meter",
                    TNTCheerMeter as any
                );

                customElements.define(
                    "tnt-cheer-option",
                    TNTCheerOption as any
                );

                customElements.define(
                    "tnt-text-poll",
                    TntTextPoll as any
                );
                customElements.define(
                    "tnt-text-ask",
                    TntTextAsk as any
                );
            }
            effectInvokedRef.current = true;
        }
    }, []);
    return <div style={{flex:1}}>
        {/* <TNTMatchCenter
            matchId="GNEJSPPBE6Q84V0"
            widgetTypes="match-score-number-predictor,team-cheer-meter,team-emoji-slider"
        ></TNTMatchCenter> */}

        <tnt-text-ask widgetId="489c5bd5-81dd-4164-b47d-281f77222272" />
        {/* <tnt-text-poll widgetId="61452049-dbde-4646-9900-48ae3d0219ee" /> */}
        {/* <tnt-image-quiz widgetId="31cefbfe-94d1-436e-8a09-e63467afc031" /> */}
        {/* <tnt-image-quiz widgetId="6f0e84ea-9bf9-428c-add4-53322fd2b5cf" />
        <tnt-image-number-prediction widgetId="7c89b231-735f-4e44-befe-a489476df0eb" /> */}
    </div>
    // return <ll-tnt-image-number-prediction widgetId="7c89b231-735f-4e44-befe-a489476df0eb"></ll-tnt-image-number-prediction>
    // return (
    //     <ll-tnt-image-quiz widgetid="82855261-2836-4716-9834-e4836fb9447a" />
    // );

})

LiveLikeNumberPredictionComponent.displayName = 'LiveLikeNumberPredictionComponent';