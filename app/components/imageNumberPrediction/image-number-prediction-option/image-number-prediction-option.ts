import { LiveLikeOption, html } from '@livelike/engagementsdk';

import "./image-number-prediction-option.css";

export class TNTImageNumberPredictionOption extends LiveLikeOption {
  createRenderRoot(): this {
    return this;
  }

  connectedCallback() {
    this.addEventListener('click', (e: MouseEvent) => this.optionSelected(e));
    return super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', (e: MouseEvent) =>
      this.optionSelected(e)
    );
  }

  firstUpdated() {
    super.firstUpdated();

    const inputElm: HTMLInputElement | null =
      this.querySelector('input[type=number]');
    if (inputElm) {
      if (
        this.option &&
        inputElm.disabled &&
        this.isFollowUp &&
        !this.isExpired
      ) {
        this.correct = this.option.correct_number === this.option.number;
        this.incorrect = this.option.correct_number !== this.option.number;
      }

      inputElm.addEventListener('change', (el: Event) => {
        if (el.target && el.target instanceof HTMLInputElement) {
          const selectedElement: HTMLOptionElement | undefined =
            (el.target.parentElement?.parentElement as HTMLOptionElement) ||
            undefined;
          if (el.target.value && selectedElement) {
            selectedElement.selected = true;
          } else if (selectedElement) {
            selectedElement.selected = false;
          }
        }
      });
      inputElm.addEventListener('keydown', () => {
        setTimeout(() => {
          this.checkSubmitEnabled();
        }, 10);
      });
    }
  }

  checkSubmitEnabled() {
    const inputElm: HTMLInputElement | null =
      this.querySelector('input[type=number]');

    if (inputElm) {
      if (!inputElm.disabled) {
        const inputNumberElement =
          inputElm.parentElement?.parentElement?.parentElement || undefined;
        const isAnyInputValueNotPresent =
          (inputNumberElement &&
            Array.from(
              inputNumberElement.querySelectorAll('input[type=number]')
            ).filter((el) => !(el as HTMLInputElement).value).length !== 0) ||
          false;

        const button: HTMLButtonElement | null | undefined =
          inputElm.parentElement?.parentElement?.parentElement?.parentElement?.querySelector(
            'button.widget-button'
          );
        if (button) {
          button.disabled = isAnyInputValueNotPresent;
        }
      }
    }
  }

  protected updated() {
    super.update();
    const inputElm: HTMLInputElement | null =
      this.querySelector('input[type=number]');
    if (inputElm) {
      this.checkSubmitEnabled();

      if (this.option && inputElm.disabled && this.isFollowUp && !this.isExpired) {
        this.correct = this.option.correct_number === this.option.number;
        this.incorrect = this.option.correct_number !== this.option.number;
      }
      const selectedElement: HTMLOptionElement | null | undefined = inputElm
        .parentElement?.parentElement as HTMLOptionElement;
      if (inputElm.value && selectedElement) {
        selectedElement.selected = true;
      } else if (selectedElement) {
        selectedElement.selected = false;
      }
    }
  }

  render() {
    if (this.isFollowUp) {
      const answered = this.option.number ?? '';
      const correctAnswer = this.option.correct_number;
      const isAnsweredCorrectly = answered === correctAnswer;

      return html`
        <livelike-image height="48px" width="48px"></livelike-image>
        <div class="livelike-voting-image-container">
          <livelike-description></livelike-description>
        </div>
        <div class="livelike-voting-input-container">
          <input
            class=${`livelike-voting-number-input ${
              isAnsweredCorrectly
                ? 'correct-number-input'
                : 'incorrect-number-input'
            }`}
            type="number"
            placeholder="-"
            disabled
            value=${answered}
          />
        </div>
      `;
    } else {
      return html`
        <livelike-image height="48px" width="48px"></livelike-image>
        <div class="livelike-voting-image-container">
          <livelike-description></livelike-description>
        </div>
        <div class="livelike-voting-input-container">
          <input
            class="livelike-voting-number-input user-number-input"
            type="number"
            placeholder="-"
            value=${this.option.number ?? ''}
            @input=${(e: Event) => this.inputHandler(this.option, e)}
            @keypress=${(e: Event) => this.keypressHandler(e)}
            ?disabled=${this.isDisabled}
          />
        </div>
      `;
    }
  }
}
