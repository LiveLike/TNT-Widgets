import { html, LiveLikeCheerMeter } from "@livelike/engagementsdk";
import "./cheer-option";
import "./cheer-meter.css";

export class TNTCheerMeter extends LiveLikeCheerMeter {
  render() {
    return html`
      <template kind="cheer-meter" id="custom-cheer">
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <div class="custom-section">cheer meter</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            <div class="cheer-image-body">
              <livelike-select class="image-grid">
                <template>
                  <livelike-option>
                    <tnt-cheer-option></tnt-cheer-option>
                  </livelike-option>
                </template>
              </livelike-select>
            </div>
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
// customElements.define("tnt-cheer-meter", TNTCheerMeter as any);
