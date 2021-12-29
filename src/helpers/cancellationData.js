import { convert } from './currencyConvertion';

export function cancellationGuestData(remainingNights,
  nights,
  priceForDays,
  accomodation,
  isCleaingPrice,
  taxRate,
  guestServiceFee,
  guestFees,
  discount,
  hostServiceFee,
  basePrice,
  total,
  policyName,
  interval,
  priorDays,
  nonRefunableNights,
  hostServiceFeeType, 
  hostServiceFeeValue,
  currency,
  base,
  rates,
  serviceFees) {

  let refundableNightPrice = 0, nonRefundableNightPrice = 0, refundWithoutGuestFee = 0;
  let updatedGuestFee = 0, updatedHostFee = 0, payoutToHost = 0, subtotal = 0, hostRefund = 0, refundHostServiceFee = 0;
  let cancellationData = {};
  let checkInNights = (remainingNights == 0 || remainingNights > 0) ? remainingNights : nights;
  let totalNights = checkInNights - nonRefunableNights;

  if (accomodation == 0) {
    isCleaingPrice = 0;
    guestServiceFee = 0;
  }
  
  if (remainingNights == 0 || remainingNights > 0) {    
    if (remainingNights == nights) {
      refundableNightPrice = ((totalNights * basePrice) * (accomodation / 100)) + isCleaingPrice + (guestServiceFee * (guestFees / 100)) - discount;
      refundWithoutGuestFee = ((totalNights * basePrice) * (accomodation / 100)) - refundableNightPrice;
      nonRefundableNightPrice = (total + guestServiceFee) - refundableNightPrice;
      updatedGuestFee = guestServiceFee;
      hostRefund = (total + guestServiceFee) - refundableNightPrice;
      if (serviceFees) {
        if (hostServiceFeeType === 'percentage') {
          refundHostServiceFee = hostRefund * (Number(hostServiceFeeValue) / 100);
        } else {
          refundHostServiceFee = convert(base, rates, hostServiceFeeValue, serviceFees.host.currency, currency);
        }
      }
      payoutToHost = hostRefund - refundHostServiceFee;
      updatedHostFee = hostServiceFee;
    } else {
      refundableNightPrice = ((totalNights * basePrice) * (accomodation / 100)) - discount;
      refundWithoutGuestFee = ((totalNights * basePrice) * (accomodation / 100));
      nonRefundableNightPrice = (total + guestServiceFee) - refundableNightPrice;
      updatedGuestFee = guestServiceFee;
      hostRefund = total - refundableNightPrice;      
      if (serviceFees) {
        if (hostServiceFeeType === 'percentage') {
          refundHostServiceFee = hostRefund * (Number(hostServiceFeeValue) / 100);
        } else {
          refundHostServiceFee = convert(base, rates, refundHostServiceFee, serviceFees.host.currency, currency);
        }
      }
      payoutToHost = hostRefund - refundHostServiceFee;
      updatedHostFee = hostServiceFee;
    }
  } else {
    refundableNightPrice = ((totalNights * basePrice) * (accomodation / 100)) + isCleaingPrice + (guestServiceFee * (guestFees / 100)) - discount;
    refundWithoutGuestFee = ((totalNights * basePrice) * (accomodation / 100)) + isCleaingPrice;
    if (refundWithoutGuestFee != total) {
      hostRefund = (total + guestServiceFee) - refundableNightPrice;
      nonRefundableNightPrice = total - refundWithoutGuestFee;
      if (serviceFees) {
        if (hostServiceFeeType === 'percentage') {
          refundHostServiceFee = hostRefund * (Number(hostServiceFeeValue) / 100);
        } else {
          refundHostServiceFee = convert(base, rates, refundHostServiceFee, serviceFees.host.currency, currency);
        }
      }
      payoutToHost = hostRefund - refundHostServiceFee;
      updatedHostFee = hostServiceFee;
      updatedGuestFee = guestServiceFee;
    }
  }


  cancellationData = {
    refundableNightPrice,
    refundWithoutGuestFee,
    nonRefundableNightPrice,
    updatedGuestFee,
    payoutToHost,
    updatedHostFee,
    updatedGuestFee
  }
  return cancellationData;
}

export function cancellationHostData(remainingNights,
  nights,
  priceForDays,
  accomodation,
  guestServiceFee,
  guestFees,
  hostServiceFee,
  basePrice,
  total,
  interval,
  serviceFees,
  priorDays,
  isCleaingPrice,
  taxRate,
  hostServiceFeeType,
  hostServiceFeeValue,
  currency,
  base,
  rates,
  nonRefunableNights) {

  let refundAmount = 0, refundAmountNoGuestFee = 0, refundDays = 0, earnedAmount = 0, earnedDays = 0, subtotal = 0, hostRefund = 0, refundHostServiceFee = 0;
  let guestRefund = 0, guestRefundWithOutServiceFee = 0, refundableNightPrice = 0;
  let cancellationData = {};
  let checkInNights = remainingNights ? remainingNights : nights;
  let totalNights = checkInNights - nonRefunableNights;

  if (accomodation == 0) {
    isCleaingPrice = 0;
    guestServiceFee = 0;
  }

  if (remainingNights && remainingNights >= 0) {
    if (remainingNights == nights) {
      refundableNightPrice = ((totalNights * basePrice) * (accomodation / 100)) + isCleaingPrice + (guestServiceFee * (guestFees / 100));
      refundAmount = ((totalNights * basePrice) * (accomodation / 100)) + isCleaingPrice + (guestServiceFee * (guestFees / 100));
      refundDays = totalNights;
      hostRefund = (total + guestServiceFee) - refundableNightPrice;

      if (serviceFees) {
        if (hostServiceFeeType === 'percentage') {
          refundHostServiceFee = hostRefund * (Number(hostServiceFeeValue) / 100);
        } else {
          refundHostServiceFee = convert(base, rates, hostServiceFeeValue, serviceFees.host.currency, currency);
        }
      }

      earnedAmount = hostRefund - refundHostServiceFee;
      refundAmountNoGuestFee = (total - hostServiceFee) - earnedAmount;

      earnedDays = totalNights;
    } else {
      refundableNightPrice = ((totalNights * basePrice) * (accomodation / 100));
      refundAmount = ((totalNights * basePrice) * (accomodation / 100));
      refundDays = totalNights;
      hostRefund = total - refundableNightPrice;

      if (serviceFees) {
        if (hostServiceFeeType === 'percentage') {
          refundHostServiceFee = hostRefund * (Number(hostServiceFeeValue) / 100);
        } else {
          refundHostServiceFee = convert(base, rates, hostServiceFeeValue, serviceFees.host.currency, currency);
        }
      }

      earnedAmount = hostRefund - refundHostServiceFee;
      refundAmountNoGuestFee = (total - hostServiceFee) - earnedAmount;
      earnedDays = totalNights;
    }

  } else {
    refundableNightPrice = ((totalNights * basePrice) * (accomodation / 100)) + isCleaingPrice + (guestServiceFee * (guestFees / 100));
    refundAmount = ((totalNights * basePrice) * (accomodation / 100)) + (guestServiceFee * (guestFees / 100));

    refundDays = totalNights;
    hostRefund = (total + guestServiceFee) - refundableNightPrice;
    if (serviceFees) {
      if (hostServiceFeeType === 'percentage') {
        refundHostServiceFee = hostRefund * (Number(hostServiceFeeValue) / 100);
      } else {
        refundHostServiceFee = convert(base, rates, hostServiceFeeValue, serviceFees.host.currency, currency);
      }
    }
    earnedAmount = hostRefund - refundHostServiceFee;
    refundAmountNoGuestFee = (total - hostServiceFee) - earnedAmount;
    earnedDays = totalNights;

  }

  cancellationData = {
    refundAmount,
    refundAmountNoGuestFee,
    earnedAmount,
    earnedDays,
    refundDays,
  }
  return cancellationData;
}
