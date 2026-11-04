import GalleryItem from "../galleryItems/galleryItem";
import "./gallery.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "../skeleton/skeleton";



const fetchPins = async ({pageParam,search, userId, boardId, savedUserId }) => {
  const res = savedUserId
    ? await apiRequest.get(`/pin/saved/${savedUserId}?cursor=${pageParam}`)
    : await apiRequest.get(
        `/pin?cursor=${pageParam}&search=${search || ""}&userId=${
          userId || ""
        }&boardId=${boardId || ""}`
      );
  return res.data;
};
// 
const Gallery = ({ search, userId, boardId, savedUserId }) => {

    const { data, fetchNextPage, hasNextPage, status  } = useInfiniteQuery({
          queryKey: savedUserId
            ? ["savedPins", savedUserId]
            : ["pins", search, userId, boardId],
          queryFn: ({ pageParam = 0 }) =>
            fetchPins({ pageParam, search, userId, boardId, savedUserId }),
        initialPageParam: 0,
        getNextPageParam: (lastPage,pages) => lastPage.nextCursor ,});

    if (status === "pending") return <Skeleton/>;
    if (status === "error") return "Error fetching pins";
    console.log(data);

    const allPins = data?.pages.flatMap((page) => page.pins) || [];

  return (
    
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more pins</h4>}
      endMessage={<h3>All Posts Loaded!</h3>}
    >
      <div className="gallery">
        {allPins?.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery
