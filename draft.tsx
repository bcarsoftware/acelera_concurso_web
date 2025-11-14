import {ContentTypes, EnvironConstants} from "./enums/constants";
import {HTTPTypes} from "./enums/http-types";
import {useState} from "react";
import type {StudyTipsResponse} from "./data/data";

{studyTips.map((studyTip) => (
    <div className="check-tip">
        <input className="checkbutton" type="checkbox" />
        <section className="section-tip">
            <p className="text-section">{studyTip.name}</p>
        </section>
    </div>
))}




