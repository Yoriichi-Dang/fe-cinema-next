import React from "react";
import TransactionCard from "./TransactionCard";
type TransactionsProps = {
  id?: string;
  isActive: boolean;
};

export default function Transactions({ id, isActive }: TransactionsProps) {
  return (
    isActive && (
      <div className="h-full flex flex-col gap-6">
        <TransactionCard
          linkImage={"/assets/movies/movie_1.jpg"}
          title="Vây hãm: Kẻ trừng phạt"
          description="2D Sub"
          room="5"
          time="20:45"
          date="07/05/2024"
          id="1"
          age={18}
        />
        <TransactionCard
          linkImage={"/assets/movies/movie_2.jpg"}
          title="Vây hãm: Kẻ trừng phạt"
          description="2D Sub"
          room="5"
          time="20:45"
          date="07/05/2024"
          id="1"
          age={18}
        />
        <TransactionCard
          linkImage={"/assets/movies/movie_2.jpg"}
          title="Vây hãm: Kẻ trừng phạt"
          description="2D Sub"
          room="5"
          time="20:45"
          date="07/05/2024"
          id="1"
          age={18}
        />
      </div>
    )
  );
}
