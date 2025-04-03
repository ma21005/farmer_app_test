const AiMessage = () => {
  return (
    <div className="card elevation-2">
      <div
        className="card-header"
        style={{ backgroundColor: '#209e91', color: '#ffffff' }}
      >
        <h1 className="font-bold text-lg m-0">ADVICE</h1>
      </div>
      <div className="card-body">
        <div className="flex direct-chat-messages items-start h-auto">
          {/* <img
            className="direct-chat-img"
            src="/docs/3.0/assets/img/user1-128x128.jpg"
            alt="message user image"
          ></img> */}
          <i className="fa-solid fa-robot fa-2x"></i>
          <div className="direct-chat-text w-full ml-4">
            AIからのアドバイスを表示させる<br></br>
            テストテストテストテストテストテストテストテストテスト<br></br>
            テストテストテストテストテストテストテストテストテスト
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiMessage;
