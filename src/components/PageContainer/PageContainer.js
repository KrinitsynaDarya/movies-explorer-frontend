import "./PageContainer.css";
const PageContainer = (props) => {
  const { children } = props;

  return <section className="page-container">{children}</section>;
};

export default PageContainer;
