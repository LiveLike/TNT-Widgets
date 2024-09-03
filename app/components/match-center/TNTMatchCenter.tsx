"use client"

import React, { useEffect, useState, useCallback } from "react";
import LiveLike from "@livelike/engagementsdk";
import type { IWidgetPayload } from "@livelike/javascript";
import { ITNTWidget, TNTWidgetType } from "../../types";
import { createWidgets, getProgram } from "../../api";
import TNTMatchCenterTimeline from "./timeline/TNTMatchCenterTimeline";

const { getWidgets, init, applyLocalization } = LiveLike;

const CLIENT_ID = "NHSsguscIF6g4OlAdI5dEdtm8zIGFHFG0Pv0EdQz"//process.env.VITE_LL_CLIENT_ID;

interface TNTMatchCenterProps {
  matchId: string;
  widgetTypes: string;
}

const TNTMatchCenter: React.FC<TNTMatchCenterProps> = React.memo(({ matchId, widgetTypes }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [programId, setProgramId] = useState<string>("");
  const [widgetCount, setWidgetCount] = useState<number>(0);

  const handleWidgetCountChanged = useCallback((value: number) => {
    setWidgetCount(value);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      if (!CLIENT_ID) {
        setError("Client Id is missing");
        return;
      }
      await init({ clientId: CLIENT_ID });
      applyLocalization({
        en: {
          "widget.submit": "Submit",
          "widget.submitted": "Submitted",
          "widget.submitted.expired": "Submitted Expired",
          "widget.expired": "Expired",
          "widget.quiz.voteButton.label": "Submit",
          "widget.quiz.votedText": "Submitted!"
        }
      })

      const widgetTypesArray = widgetTypes.length
        ? (widgetTypes.split(",") as TNTWidgetType[])
        : [];
      if (!matchId || !widgetTypesArray.length) {
        setLoading(false);
        return;
      }
      if (widgetCount === 0) {
        checkWidgetCount();
      }
    };
    initialize();

  }, [matchId, widgetTypes]);

  const initializeGameCenter = async (matchId: string, widgetTypes: TNTWidgetType[]) => {
    const program = await getProgram({ customId: matchId });
    if (!program) {
      return await createWidgets(matchId, widgetTypes);
    } else {
      const widgetsRes = await getWidgets({ programId: program.id });
      const llWidgets = widgetsRes.results;
      handleWidgetCountChanged(llWidgets.length);
      let pendingWidgetTypes = widgetTypes.filter((widgetType) => {
        return !llWidgets.some((widget: IWidgetPayload) =>
          widget.widget_attributes.some(({ value }) => value === widgetType)
        );
      });
      if (pendingWidgetTypes.length) {
        const response = await createWidgets(matchId, pendingWidgetTypes);
        setLoading(false);
        return response;
      }

      setLoading(false);
      return {
        programId: program.id,
        widgets: llWidgets.map(({ id, kind, widget_attributes }: any) => ({
          widgetId: id,
          widgetKind: kind,
          widgetType:
            (widget_attributes.find(({ key }: any) => key === "widgetType")
              ?.value as TNTWidgetType) ?? "",
        })),
      };
    }
  };

  const checkWidgetCount = useCallback(() => {
    const interval = setInterval(() => {
      const widgetTypeValue = widgetTypes.length
        ? (widgetTypes.split(",") as TNTWidgetType[])
        : [];
      
      // Use a function to get the latest widgetCount
      setWidgetCount((currentWidgetCount) => {
        if (currentWidgetCount < widgetTypeValue.length) {
          initializeGameCenter(matchId, widgetTypeValue).then(
            ({ programId, widgets }) => {
              setProgramId(programId);
            }
          );
          return currentWidgetCount; // Return the same value to avoid unnecessary re-renders
        } else {
          clearInterval(interval);
          return currentWidgetCount;
        }
      });
    }, 5000);

    // Return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [matchId, widgetTypes, initializeGameCenter]);

  // Use the checkWidgetCount function in a useEffect
  useEffect(() => {
    const cleanup = checkWidgetCount();
    return cleanup;
  }, [checkWidgetCount]);

  const renderTimeline = () => (
    <TNTMatchCenterTimeline
      programId={programId}
      handleWidgetCountChanged={handleWidgetCountChanged}
    />
  );

  const renderLoader = () => (
    <div className="tnt-match-container">
      <span>Loading...</span>
    </div>
  );

  if (!matchId) {
    return null;
  }
  if (loading) {
    return renderLoader();
  }
  if (!programId) {
    return null;
  }
  return (
    <div className="tnt-match-center-container">{renderTimeline()}</div>
  );
});

export default React.memo(TNTMatchCenter);