function calculateTimeDifference(targetDate){
   //criar variaveis para os elementos 
   const currentDate = new Date();
   const futureDate = new Date(targetDate)

   //vamos validar
   if(isNaN()){
    throw new Error("Invalid date format")
   }

   if(futureDate <= currentDate){
    return {error: "The date provided is in the past."}
   }

   //calcular em milissegundos
   const diffInMillis = futureDate - currentDate;

   //transformar em min
   const diffInMin = Math.floor(diffInMillis / (1000 * 60))

   // transformar em dia 
   const days = Math.floor(diffInMin / (60 * 24))

   // transformar em horas 
   const hours = Math.floor(diffInMin % (60 * 24) / 60)

   // transformar em min 
   const minutes = Math.floor(diffInMin % 60)

 return {
    days,
    hours, 
    minutes
 }
}

module.exports = {calculateTimeDifference}