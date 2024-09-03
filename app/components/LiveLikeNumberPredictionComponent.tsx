"use client"

import React, { useEffect, useState, useRef } from "react";

import { TNTImageSlider } from "./emojiSlider/emoji-slider";
import { TNTImageNumberPrediction } from "./imageNumberPrediction/image-number-prediction";
import { TntImageQuiz } from "./image-quiz/image-quiz";
import { TNTImageNumberPredictionFollowUp } from "./imageNumberPrediction/image-number-prediction-follow-up";
import { TNTImageNumberPredictionOption } from "./imageNumberPrediction/image-number-prediction-option";
import { TNTCheerOption } from "./cheer-meter/cheer-option";
import TNTMatchCenter from "./match-center/TNTMatchCenter";
import { TNTCheerMeter } from "./cheer-meter";
import "../index.css";
import "../../assets/fonts/font.css";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'tnt-image-quiz': React.DetailedHTMLProps<React.HTMLAttributes<TntImageQuiz>, TntImageQuiz> & {
                widgetId: string;
            };
            'tnt-image-number-prediction': React.DetailedHTMLProps<React.HTMLAttributes<TNTImageNumberPredictionOption>, TNTImageNumberPredictionOption> & {
                widgetId: string;
            };
        }
    }
}

export const LiveLikeNumberPredictionComponent = React.memo(() => {
    const effectInvokedRef = useRef(false);
    useEffect(() => {
        if (!effectInvokedRef.current) {
            // const intiLiveLike = async () => {
            //     await LiveLike.init({ clientId: 'TDPcjbTEZrpZioRSZPaRy4jRw0Kck01t6i4bJFjk' });
            // }
            // intiLiveLike();
            

            if (typeof window !== 'undefined') {

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
            }
            effectInvokedRef.current = true;
        }
    }, []);
    return <div>
        <TNTMatchCenter
            matchId="GNEJSPPBE6Q84V0"
            widgetTypes="match-score-number-predictor,team-cheer-meter,team-emoji-slider"
        ></TNTMatchCenter>

        {/* <tnt-image-quiz widgetId="31cefbfe-94d1-436e-8a09-e63467afc031" />
        <tnt-image-quiz widgetId="6f0e84ea-9bf9-428c-add4-53322fd2b5cf" />
        <tnt-image-number-prediction widgetId="7c89b231-735f-4e44-befe-a489476df0eb" /> */}
    </div>
    // return <ll-tnt-image-number-prediction widgetId="7c89b231-735f-4e44-befe-a489476df0eb"></ll-tnt-image-number-prediction>
    // return (
    //     <ll-tnt-image-quiz widgetid="82855261-2836-4716-9834-e4836fb9447a" />
    // );

})

LiveLikeNumberPredictionComponent.displayName = 'LiveLikeNumberPredictionComponent';