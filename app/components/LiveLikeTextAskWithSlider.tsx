"use client"

import React, { useEffect, useRef } from "react";

import "../index.css";
import "../../assets/fonts/font.css";
import LiveLike from "@livelike/engagementsdk";
import { TntTextAsk } from "./text-ask";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'tnt-text-ask': React.DetailedHTMLProps<React.HTMLAttributes<TntTextAsk>, TntTextAsk> & {
                widgetId: string;
                mode?: string;
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
                const customMode = function (widget: any) {
                    widget.widget.hide_dismiss_button = true;
                    const timeout = widget.widget.interactive_until ? expiryTimeoutFn(widget.widget.interactive_until) : null;
                    console.log(timeout)
                    widget.widget.interactive &&
                        widget.widget.interactive({ timeout: timeout }).then(() =>
                            widget.widget.results({
                                timeout: 0,
                            }));
                }
                LiveLike.registerWidgetMode("custommode", customMode);
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
                    "tnt-text-ask",
                    TntTextAsk as any
                );
            }
            effectInvokedRef.current = true;
        }
    }, []);

    function expiryTimeoutFn(interactiveUntil: string) {
        const expiredTime = new Date(interactiveUntil);
        const timeout = expiredTime.getTime() - Date.now();
        return timeout;
    }

    return  <div style={{ flex: 1 }}>
                <tnt-text-ask widgetId="a859f009-1e3b-4900-af4d-1dded5d4de3b" mode="custommode" />
            </div>
})

LiveLikeNumberPredictionComponent.displayName = 'LiveLikeNumberPredictionComponent';