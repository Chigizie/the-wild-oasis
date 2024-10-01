import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { numberOfItemsPerPage } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageIndex = !searchParams.get("page")
    ? 1
    : +searchParams.get("page");

  const totalPages = Math.ceil(count / numberOfItemsPerPage);

  function nextPage() {
    const next =
      currentPageIndex === totalPages ? currentPageIndex : currentPageIndex + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function previousPage() {
    const prev =
      currentPageIndex === 1 ? currentPageIndex : currentPageIndex - 1;

    //searchParams.set("page", prev);
    setSearchParams({ page: prev });
  }

  if (totalPages <= 1) return;
  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPageIndex - 1) * numberOfItemsPerPage + 1}</span>{" "}
        to
        <span>
          {" "}
          {currentPageIndex === totalPages
            ? count
            : currentPageIndex * numberOfItemsPerPage}
        </span>{" "}
        of<span> {count}</span> result
      </P>
      <Buttons>
        <PaginationButton
          onClick={previousPage}
          disabled={currentPageIndex === 1}
        >
          <HiChevronLeft />
          <span>previuos</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPageIndex === totalPages}
        >
          <span>next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
