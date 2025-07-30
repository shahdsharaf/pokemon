import "./PageHeader.scss";

type Props = {
  className?: string;
  title?: string;
  description?: string;
};
const PageHeader = ({ description, title, className }: Props) => {
  return (
    <div className={`page_header ${className ?? ""}`}>
      <h2 className="page_header-title">{title}</h2>
      <p className="page_header-description">{description}</p>
    </div>
  );
};

export default PageHeader;
