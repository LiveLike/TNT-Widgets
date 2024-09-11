const embedReactionBarStyles = `<style>

livelike-embed-reaction {
  position: absolute;
  top: -4rem;
  left: 4%
}

span.embed-user-reaction-container.embed-self-user-reaction {
  background: #E7E9EA
}

span.embed-user-reaction-container:hover {
  background: #E7E9EA
}

span.embed-user-reaction-container.embed-self-user-reaction:hover {
  background: white
}

span.embed-user-reaction-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 4px 8px 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

span.reaction-add-icon.clicked {
  margin-right: 8px;
}

.embed-reaction-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px !important;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex-wrap: nowrap !important;
  margin-top: 0px !important;
  background-color: #D0D3D5
}

img.embed-user-reaction-img {
  width: 26px;
  height: 26px;
}

span.embed-user-reaction-count {
  font-size: 12px;
  margin-left: 0px !important;
  margin-top: 2px;
}
</style>`