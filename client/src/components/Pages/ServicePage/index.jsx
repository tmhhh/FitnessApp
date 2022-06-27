import { PAGE_SIZE } from "assets/constants";
import Pagination from "components/Common/Pagination/Pagination";
import ServiceContainer from "components/Service/ServiceContainer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "redux/slices/serviceSlice";

export default function ServicePage() {
  const dispatch = useDispatch();
  const { list: listServices, totalPages } = useSelector(
    (state) => state.serviceReducer
  );
  console.log(listServices);
  useEffect(() => {
    (async () => {
      await dispatch(
        getServices({
          page: 1,
          size: PAGE_SIZE,
        })
      );
    })();
  }, []);

  const handlePageChange = (options) => {
    dispatch(getServices(options));
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <ServiceContainer listServices={listServices} />
      <div className="d-flex justify-content-center">
        <Pagination
          numOfPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
