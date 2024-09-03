import { LiveLikeWidgetElement, html } from "@livelike/engagementsdk";

export class TNTCheerOption extends LiveLikeWidgetElement {
  createRenderRoot(): this {
    return this;
  }
  votePercentage = () => {
    const totalVotes = this.items.reduce(
      (a: number, b: any) => a + b["vote_count"],
      0
    );
    return totalVotes > 0
      ? Math.round((this.item.vote_count / totalVotes) * 100)
      : 0;
  };
  optionVoteUpdated = () => {
    const imageContainer = this.shadowRoot? this.shadowRoot.querySelector("livelike-image"): null;
    imageContainer &&
    imageContainer.parentElement && imageContainer.parentElement.style.setProperty(
        "background",
        `linear-gradient(0deg, #0096ff ${this.votePercentage()}%, transparent 0)`
      );
  };

  updateBackground = () => {
    this.parentElement && this.parentElement.style.setProperty(
      "background",
      `linear-gradient(0deg, var(--brand-secondary) ${this.votePercentage()}%, var(--brand-quaternary-background) 0)`
    );
  };

  updated(changedProps: Map<PropertyKey, unknown>) {
    changedProps.forEach((prevValue, name) => {
      if (name === "items" && prevValue !== this.items) {
        this.updateBackground();
      }
    });
  }
  render() {
    return html`
      <style>
        livelike-image {
          height="60px"
          width="93px"
          padding: 10px;
          border-radius: 6px;
        }
        livelike-description {
          font-size: 20px;
          text-align: center;
          line-height: 1.2;
          font-weight: 700;
        }
        .cheer-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          padding: 0.75rem 0.75rem 0;
        }
        livelike-description {
          font-size: 12px;
          width: 98px;
          font-style: normal;
          font-weight: 500;
          line-height: 15px;
          letter-spacing: 0.5px;

        }
      </style>
      <div class="cheer-image-container">
        <livelike-image
          height="35px"
          width="35px"
          class="cheer-image"
        ></livelike-image>
      </div>

      <livelike-description></livelike-description>
    `;
  }
}
// customElements.define("cheer-option", TNTCheerOption as any);
