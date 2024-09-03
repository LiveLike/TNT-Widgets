import { html, LiveLikeEmojiSlider } from "@livelike/engagementsdk";
import "./emoji-slider.css";

export class TNTImageSlider extends LiveLikeEmojiSlider {
  
  connectedCallback(): Promise<void> {
    this.kind = 'emoji-slider';
    this.updateComplete.then(() => {
      const interactiveUntil: string = this.widgetPayload.interactive_until;
      this.isExpired = interactiveUntil
        ? Date.now() > new Date(interactiveUntil).getTime()
        : false;
    });
    return super.connectedCallback();
  }

  fetchLatestInteraction() {
    fetch(this.widgetPayload.url)
      .then((r) => r.json())
      .then((updatedWidget) => {
        this.widgetPayload = updatedWidget;

        if (updatedWidget.average_magnitude) {
          this.average_magnitude = updatedWidget.average_magnitude;
        }

        if (updatedWidget.options) {
          this.widgetPayload.options = updatedWidget.options;
        }
      });
  }

  lockInVote(mag: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.voteDisable && mag >= 0 && mag <= 1) {
        this.showUserVoteInstantly && this.updateAverageMagnitude(mag);
        this.voteDisable = true;
        this.createVote(this.widgetPayload.vote_url, {
          magnitude: mag.toString(),
        }).then(() => {
          this.sliderVoteSubmitted = true;
          this.disabled = true;
          this.fetchLatestInteraction();
          resolve(true);
        });
      } else {
        reject(new Error("Magnitude not a number between 0 and 1."));
      }
    });
  }

  checkExpiry() {
    const interactiveUntil: string | undefined = this.widgetPayload.interactive_until;
    this.isExpired = interactiveUntil
      ? Date.now() > new Date(interactiveUntil).getTime()
      : false;
  }

  render() {

    const renderSubmitBtnText = () => {
      this.checkExpiry();
      return this.isExpired
        ? this.interaction
          ? this.owner.localize('widget.submitted.expired')
          : this.owner.localize('widget.expired')
        : this.disabled
          ? this.owner.localize('widget.submitted')
          : this.owner.localize('widget.submit');
    };


    const initialMag = Math.round(
      (this.interaction
        ? this.interaction.magnitude
        : this.widgetPayload.initial_magnitude) * 100
    );

    const resultMark =
      this.phase !== "ready" &&
        this.phase !== "interactive" &&
        String(this.val) !== "null"
        ? html`
            <div
              class="result-mark"
              style="left: calc(${Math.round(this.average_magnitude * 100) !==
            100
            ? Math.round(this.average_magnitude * 100)
            : 99}%)"
            >
              <div class="result-average">Avg</div>
            </div>
          `
        : null;

    return html`
      <template>
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <div class="custom-section">image slider</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            <form style="--val: ${initialMag};" class="input-form">
              <div class="input-container">
                <input
                  type="range"
                  class="slider-input"
                  ?disabled="${this.disabled}"
                  value="${initialMag}"
                  @input=${() => (this.userInteracted = true)}
                />
                ${resultMark}
              </div>
              <output class="slider-thumb">
                <img class="slider-image" />
              </output>
            </form>
            <livelike-footer>
              <button
                class="vote-button"
                @click=${() => this.lockInVote(this.val / 100)}
                ?disabled="${this.sliderVoteSubmitted ||
      this.voteDisable ||
      this.disabled ||
      !this.userInteracted}"
              >
                ${renderSubmitBtnText()}
              </button>
            </livelike-footer>
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
// customElements.define("tnt-emoji-slider", TNTImageSlider as any);
