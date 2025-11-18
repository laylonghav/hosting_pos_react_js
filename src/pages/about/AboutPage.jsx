import { useDispatch, useSelector } from "react-redux";
import MasterLayout from "../../components/layouts/MasterLayout";
import { decrement, increment } from "../../store/counterSlice";

export default function AboutPage() {
  const counter = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <p>About Page</p>

      <div className=" h-[400px] p-5 bg-red-400 flex gap-3 justify-center items-center">
        <div className="w-[100px] h-[100px] flex-1 bg-blue-400">box1</div>
        <div className="w-[100px] h-[100px] flex-1  bg-orange-400">box2</div>
        <div className="w-[100px] h-[100px] flex-1 bg-green-400">box3</div>
      </div>
    </div>
  );
}
