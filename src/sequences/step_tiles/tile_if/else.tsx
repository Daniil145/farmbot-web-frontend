import * as React from "react";
import { FBSelect } from "../../../ui/index";
import { IfParams, seqDropDown, initialValue, updateSubSeq } from "./index";
import { t } from "i18next";

export function Else(props: IfParams) {
  let step = props.currentStep;
  let seq = props.currentSequence;
  let { dispatch } = props;
  let onChange = updateSubSeq(step.args._then, dispatch, seq, step);
  return <div>
    <div className="col-xs-12 col-md-12">
      <h4>ELSE...</h4>
    </div>
    <div className="col-xs-12 col-md-12">
      <label>{t("Execute Sequence")}</label>
      <FBSelect
        list={seqDropDown(props.resources)}
        placeholder="None (continue to next step)"
        onChange={onChange}
        initialValue={initialValue(props.currentStep.args._else, props.resources)}
      />
    </div>
  </div>;
}
