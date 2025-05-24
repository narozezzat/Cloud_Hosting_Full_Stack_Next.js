import { Button, Result } from "antd";

const NotFoundPage = () => {
  return (
    <div className="flex fix-height items-center justify-center bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button href="/" type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
