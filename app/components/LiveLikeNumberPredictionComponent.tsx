"use client"

import React, { useEffect, useState, useRef } from "react";
import LiveLike from '@livelike/engagementsdk';
import './imageNumberPrediction/image-number-prediction'
import './imageNumberPrediction/image-number-prediction-follow-up'
import './imageNumberPrediction/image-number-prediction-option'
import './image-quiz/image-quiz'
import { LLtntImageNumberPredictionOption } from "./imageNumberPrediction/image-number-prediction";
import { LLtntImageQuiz } from "./image-quiz/image-quiz";   
import { LLtntImageNumberPredictionFollowUp } from "./imageNumberPrediction/image-number-prediction-follow-up";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'll-tnt-image-quiz': React.DetailedHTMLProps<React.HTMLAttributes<LLtntImageQuiz>, LLtntImageQuiz> & {
                widgetId: string;
            };
            'll-tnt-image-number-prediction': React.DetailedHTMLProps<React.HTMLAttributes<LLtntImageNumberPredictionOption>, LLtntImageNumberPredictionOption> & {
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
            intiLiveLike();

            if(typeof window !== 'undefined') {
            customElements.define(
                "ll-tnt-image-quiz",
                LLtntImageQuiz as any
              );
              
            customElements.define(
                "ll-tnt-image-number-prediction",
                LLtntImageNumberPredictionOption as any
              );
            effectInvokedRef.current = true;

            customElements.define(
                "ll-tnt-image-number-prediction-follow-up",
                LLtntImageNumberPredictionFollowUp as any
              );
            }
        }
    }, []);
    return (typeof window !== 'undefined' ? <div>
        
            <ll-tnt-image-quiz widgetId="31cefbfe-94d1-436e-8a09-e63467afc031" />
            <ll-tnt-image-quiz widgetId="6f0e84ea-9bf9-428c-add4-53322fd2b5cf" />
            <ll-tnt-image-number-prediction widgetId="7c89b231-735f-4e44-befe-a489476df0eb" />
        </div> : null)
    // return <ll-tnt-image-number-prediction widgetId="7c89b231-735f-4e44-befe-a489476df0eb"></ll-tnt-image-number-prediction>
    // return (
    //     <ll-tnt-image-quiz widgetid="82855261-2836-4716-9834-e4836fb9447a" />
    // );

})

LiveLikeNumberPredictionComponent.displayName = 'LiveLikeNumberPredictionComponent';