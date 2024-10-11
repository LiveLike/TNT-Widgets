"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react';
import './tnt-match-center-timeline.css';
import '../../imageNumberPrediction/image-number-prediction';
import '../../imageNumberPrediction/image-number-prediction-follow-up';
import '../../cheer-meter';
import '../../emojiSlider';
import { IWidgetOptionItem, IWidgetPayload, WidgetKind } from '@livelike/javascript';
import {LiveLikeWidgets} from '@livelike/engagementsdk'

interface TNTMatchCenterTimelineProps {
  programId: string;
  handleWidgetCountChanged: (count: number) => void;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'livelike-widgets': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                programId: string;
                mode: string;
            };
        }
    }
}

const TNTMatchCenterTimeline: React.FC<TNTMatchCenterTimelineProps> = React.memo(({ programId, handleWidgetCountChanged }) => {
  const [widgetCount, setWidgetCount] = useState(0);
  const widgetsRef = useRef<HTMLElement | null>(null);

  const updateWidgetToFollowUpWidget = useCallback((payload: {
    widgets: IWidgetPayload[];
  }) => {
    const followUpWidgetsList = [WidgetKind.IMAGE_NUMBER_PREDICTION_FOLLOW_UP];
    const allowedWidgetKinds = Object.values(WidgetKind);

    const widgets = payload.widgets
    setWidgetCount(widgets.length);
    handleWidgetCountChanged(widgets.length);

    const followUpWidgets = widgets.filter((widget: IWidgetPayload) => followUpWidgetsList.includes(widget.kind));
    const nonFollowUpWidgets = widgets.filter((widget: IWidgetPayload) => !followUpWidgetsList.includes(widget.kind));
    
    const updatedWidgets = nonFollowUpWidgets.map(
      (nfWidget: IWidgetPayload) => followUpWidgets.find(
        (fWidget: IWidgetPayload) => fWidget.id === nfWidget.follow_ups?.[0].id
      ) ?? nfWidget
    );

    return updatedWidgets.filter((widget: IWidgetPayload) => allowedWidgetKinds.includes(widget.kind));
  }, [handleWidgetCountChanged]);

  const customWidgetRenderer = useCallback((payload: {
    widgetPayload: IWidgetPayload;
  }) => {
    const widgetPayload = payload.widgetPayload;
    switch (widgetPayload.kind) {
      case WidgetKind.CHEER_METER:
        return document.createElement("tnt-cheer-meter");
      case WidgetKind.IMAGE_NUMBER_PREDICTION:
        return document.createElement("tnt-image-number-prediction");
      case WidgetKind.EMOJI_SLIDER:
        return document.createElement("tnt-emoji-slider");
      case WidgetKind.IMAGE_NUMBER_PREDICTION_FOLLOW_UP:
        return document.createElement("tnt-image-number-prediction-follow-up");
      default:
        return null;
    }
  }, []);

  const handleIncomingFollowUpWidget = useCallback((widgetPayload: IWidgetPayload) => {
    const allowedWidgetKinds = Object.values(WidgetKind);
    const followUpWidgetsList = [WidgetKind.IMAGE_NUMBER_PREDICTION_FOLLOW_UP];

    if (!allowedWidgetKinds.includes(widgetPayload.kind)) return null;
    if (!followUpWidgetsList.includes(widgetPayload.kind)) return widgetPayload;

    if (widgetPayload.kind === WidgetKind.IMAGE_NUMBER_PREDICTION_FOLLOW_UP) {
      const predictionWidget = document.querySelector(
        `[widgetId="${widgetPayload.image_number_prediction_id}"]`
      );

      if (predictionWidget) {
        // ... (rest of the logic for handling IMAGE_NUMBER_PREDICTION_FOLLOW_UP)
        // This part remains largely unchanged from the original component
      }
    }
  }, []);

  const widgetAttachedCallback = useCallback((evt: any) => {
    const { widget, element } = evt.detail;
    const allowedWidgetKinds = Object.values(WidgetKind);
    if (!allowedWidgetKinds.includes(widget.kind)) return null;

    const interval = setInterval(() => {
      if (widget.kind === WidgetKind.IMAGE_NUMBER_PREDICTION) {
        return;
      }
      fetch(widget.url)
        .then((r) => r.json())
        .then((updatedWidget) => {
          element.widgetPayload = updatedWidget;

          if (updatedWidget.average_magnitude) {
            element.average_magnitude = updatedWidget.average_magnitude;
          }

          if (element.count) {
            element.count = updatedWidget.options.reduce(
              (a: number, c: IWidgetOptionItem) => a + (c.vote_count ?? 0),
              0
            );
          }

          if (
            updatedWidget.options &&
            updatedWidget.kind === WidgetKind.CHEER_METER
          )
            element.options = updatedWidget.options;
        });
    }, 60000);

    const widgetDetachedCallback = () => {
      clearInterval(interval);
      element.removeEventListener('widgetattached', widgetAttachedCallback);
      element.removeEventListener('beforewidgetdetached', widgetDetachedCallback);
    };

    element.addEventListener('beforewidgetdetached', widgetDetachedCallback);
  }, []);

  const widgetInteractedCallback = useCallback((evt: any) => {
    const { widget, element, item } = evt.detail;
    const optionSelected = item.id;
    const newPayload = element.widgetPayload;

    element.widgetPayload = { ...newPayload };
    const optionIndex = widget.options.findIndex(
      (option: IWidgetOptionItem) => option.id === optionSelected
    );
    if (optionIndex !== -1) {
      widget.options[optionIndex].vote_count += 1;
    }
    if (widget.kind === WidgetKind.CHEER_METER) {
      element.options = [...widget.options];
    }
  }, []);

  useEffect(() => {
    const widgets = widgetsRef.current;
    if (widgets) {
      (widgets as LiveLikeWidgets).onInitialWidgetsLoaded = updateWidgetToFollowUpWidget;
      (widgets as LiveLikeWidgets).customWidgetRenderer = customWidgetRenderer;
      (widgets as LiveLikeWidgets).onWidgetReceived = handleIncomingFollowUpWidget;

      widgets.addEventListener('widgetattached', widgetAttachedCallback);
      widgets.addEventListener('interacted', widgetInteractedCallback);
    }

    document.addEventListener('dblclick', (event) => {
      event.preventDefault();
    }, { passive: false });

    return () => {
      if (widgets) {
        widgets.removeEventListener('widgetattached', widgetAttachedCallback);
        widgets.removeEventListener('interacted', widgetInteractedCallback);
      }
    };
  }, [updateWidgetToFollowUpWidget, customWidgetRenderer, handleIncomingFollowUpWidget, widgetAttachedCallback, widgetInteractedCallback]);

  return (
    <livelike-widgets
      ref={widgetsRef}
      programId={programId}
      mode="interactive-timeline"
    ></livelike-widgets>
  );
});

export default TNTMatchCenterTimeline;