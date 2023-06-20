import classNames from "classnames";

interface RankResponse {
  validations: ValidationItem[];
  score: number;
}

interface ValidationItem {
  type: "positive" | "negative";
  message: string;
}

type RankingProps = {
  ranking: RankResponse;
};

export const Ranking = ({ ranking }: RankingProps) => {
  const positive = ranking.validations.filter(
    (item: ValidationItem) => item.type === "positive"
  );
  const negative = ranking.validations.filter(
    (item: ValidationItem) => item.type === "negative"
  );
  const percentage = Math.abs(ranking.score * 20) + "%";
  const boost = ranking.score < 1 ? "negative" : "positive";
  const sliderColor = boost === "negative" ? "bg-red-600" : "bg-green-600";
  return (
    <>
      <div>
        <div className="slider bg-gray-300 h-4 rounded-full relative overflow-hidden">
          <div
            className={classNames(
              "absolute top-0 transition-width duration-250 ease-linear h-20",
              sliderColor
            )}
            style={{ width: percentage }}
          />
        </div>

        <ul className="mt-5 p-0">
          {positive.map((item: ValidationItem, index: number) => (
            <li
              className="positive text-green-600 flex items-center space-x-2 list-style-none my-5 text-sm"
              key={`positive-${index}`}
            >
              <span>👍</span>
              <span>{item.message.replace(/\(\s*[+-]?\d+\s*\)/, '')}</span>
            </li>
          ))}
          {negative.map((item: ValidationItem, index: number) => (
            <li
              className="negative text-red-600 flex items-center space-x-2 list-style-none my-1 text-sm"
              key={`negative-${index}`}
            >
              <span>👎</span>
              <span>{item.message.replace(/\(\s*[+-]?\d+\s*\)/, '')}</span>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .slider:after {
          content: " ";
          display: block;
          width: 2px;
          height: 20px;
          position: absolute;
          top: 0;
          left: calc(25% - 1px);
          background: #000;
        }
      `}</style>
    </>
  );
};
