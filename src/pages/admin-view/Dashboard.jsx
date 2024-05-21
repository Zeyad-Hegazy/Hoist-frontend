import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import "./Dashboard.css";
import { faFolder, faToolbox, faUsers, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const chartSetting = {
      //   xAxis: [
      //         {
      //               label: "Total Reports",
      //         },
      //   ],
      width: 600,
      height: 400,
};
const dataset = [
      {
            london: 59,
            paris: 57,
            newYork: 86,
            seoul: 21,
            month: "Jan",
      },
      {
            london: 50,
            paris: 52,
            newYork: 78,
            seoul: 28,
            month: "Feb",
      },
      {
            london: 47,
            paris: 53,
            newYork: 106,
            seoul: 41,
            month: "Mar",
      },
      {
            london: 54,
            paris: 56,
            newYork: 92,
            seoul: 73,
            month: "Apr",
      },
      {
            london: 57,
            paris: 69,
            newYork: 92,
            seoul: 99,
            month: "May",
      },
      {
            london: 60,
            paris: 63,
            newYork: 103,
            seoul: 144,
            month: "June",
      },
      {
            london: 59,
            paris: 60,
            newYork: 105,
            seoul: 319,
            month: "July",
      },
      {
            london: 65,
            paris: 60,
            newYork: 106,
            seoul: 249,
            month: "Aug",
      },
      {
            london: 51,
            paris: 51,
            newYork: 95,
            seoul: 131,
            month: "Sept",
      },
      {
            london: 60,
            paris: 65,
            newYork: 97,
            seoul: 55,
            month: "Oct",
      },
      {
            london: 67,
            paris: 64,
            newYork: 76,
            seoul: 48,
            month: "Nov",
      },
      {
            london: 61,
            paris: 70,
            newYork: 103,
            seoul: 25,
            month: "Dec",
      },
];
// !-----------------------------
const dataset_2 = [
      {
            london: 59,
            paris: 57,
            newYork: 86,
            seoul: 21,
            month: "Jan",
      },
      {
            london: 50,
            paris: 52,
            newYork: 78,
            seoul: 28,
            month: "Fev",
      },
      {
            london: 47,
            paris: 53,
            newYork: 106,
            seoul: 41,
            month: "Mar",
      },
      {
            london: 54,
            paris: 56,
            newYork: 92,
            seoul: 73,
            month: "Apr",
      },
      {
            london: 57,
            paris: 69,
            newYork: 92,
            seoul: 99,
            month: "May",
      },
      {
            london: 60,
            paris: 63,
            newYork: 103,
            seoul: 144,
            month: "June",
      },
      {
            london: 59,
            paris: 60,
            newYork: 105,
            seoul: 319,
            month: "July",
      },
      {
            london: 65,
            paris: 60,
            newYork: 106,
            seoul: 249,
            month: "Aug",
      },
      {
            london: 51,
            paris: 51,
            newYork: 95,
            seoul: 131,
            month: "Sept",
      },
      {
            london: 60,
            paris: 65,
            newYork: 97,
            seoul: 55,
            month: "Oct",
      },
      {
            london: 67,
            paris: 64,
            newYork: 76,
            seoul: 48,
            month: "Nov",
      },
      {
            london: 61,
            paris: 70,
            newYork: 103,
            seoul: 25,
            month: "Dec",
      },
];

const valueFormatter = (value) => `${value} work order`;

const chartSetting_2 = {
      yAxis: [
            // {
            //       label: "rainfall (mm)",
            // },
      ],
      series: [{ dataKey: "seoul", label: "Total Work Orders", valueFormatter, color: "#4079F4" }],
      height: 400,
      sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                  transform: "translateX(-10px)",
            },
      },
};

const valueFormatter_2 = (value) => `${value} report`;

const Dashboard = () => {
      return (
            <>
                  <div className="cards flex justify-between">
                        <div className="single-card flex justify-between align-baseline bg-gray-700 w-[20%] shadow-2xl px-9 py-3 rounded-xl">
                              <div className="card-text">
                                    <h2>Total Users</h2>
                                    <p>12</p>
                              </div>
                              <FontAwesomeIcon className="mt-2" icon={faUsers} />
                        </div>
                        <div className="single-card flex justify-between align-baseline bg-gray-700 w-[20%] shadow-2xl px-9 py-3 rounded-xl">
                              {" "}
                              <div className="card-text">
                                    <h2>Total Category</h2>
                                    <p>30</p>
                              </div>
                              <FontAwesomeIcon className="mt-2" icon={faFolder} />
                        </div>
                        <div className="single-card flex justify-between align-baseline bg-gray-700 w-[20%] shadow-2xl px-9 py-3 rounded-xl">
                              {" "}
                              <div className="card-text">
                                    <h2>Total Equipments</h2>
                                    <p>102</p>
                              </div>
                              <FontAwesomeIcon className="mt-2" icon={faWrench} />
                        </div>
                        <div className="single-card flex justify-between align-baseline bg-gray-700 w-[20%] shadow-2xl px-9 py-3 rounded-xl">
                              {" "}
                              <div className="card-text">
                                    {" "}
                                    <h2>Total Installations</h2>
                                    <p>40</p>
                              </div>
                              <FontAwesomeIcon className="mt-2" icon={faToolbox} />
                        </div>
                  </div>
                  <div className="second-cards flex justify-between mt-6 gap-x-[5.5rem]">
                        <div className="w-[50%] single-card flex justify-between align-baseline bg-gray-700  shadow-2xl px-9 py-3 rounded-xl">
                              <div className="card-text">
                                    <h2>Low Defects</h2>
                                    <p>25</p>
                              </div>
                              <div className="card-text">
                                    <h2>Medium Defects</h2>
                                    <p>13</p>
                              </div>
                              <div className="card-text">
                                    <h2>High Defects</h2>
                                    <p>12</p>
                              </div>
                              {/* <FontAwesomeIcon className="mt-2" icon={faFolder} /> */}
                        </div>
                        <div className="w-[50%] single-card flex justify-between align-baseline bg-gray-700  shadow-2xl px-9 py-3 rounded-xl">
                              <div className="card-text">
                                    <h2>Total Reports</h2>
                                    <p>25</p>
                              </div>
                              <div className="card-text">
                                    <h2>Valid Reports</h2>
                                    <p>13</p>
                              </div>
                              <div className="card-text">
                                    <h2>Expired Reports</h2>
                                    <p>12</p>
                              </div>
                              {/* <FontAwesomeIcon className="mt-2" icon={faFolder} /> */}
                        </div>
                  </div>
                  <div className="flex justify-between mt-6 ">
                        {" "}
                        <div className="first-chart">
                              <BarChart
                                    dataset={dataset}
                                    yAxis={[{ scaleType: "band", dataKey: "month" }]}
                                    series={[
                                          {
                                                dataKey: "seoul",
                                                label: "Total Reports",
                                                valueFormatter_2,
                                                color: "#4079F4",
                                          },
                                    ]}
                                    layout="horizontal"
                                    {...chartSetting}
                              />
                        </div>
                        <div style={{ width: "100%" }}>
                              {/* <TickParamsSelector
                              tickPlacement={tickPlacement}
                              tickLabelPlacement={tickLabelPlacement}
                              setTickPlacement={setTickPlacement}
                              setTickLabelPlacement={setTickLabelPlacement}
                        /> */}
                              <BarChart
                                    dataset={dataset_2}
                                    xAxis={[
                                          {
                                                scaleType: "band",
                                                dataKey: "month",
                                                //   tickPlacement,
                                                //   tickLabelPlacement,
                                          },
                                    ]}
                                    {...chartSetting_2}
                              />
                        </div>
                  </div>
            </>
      );
};

export default Dashboard;
