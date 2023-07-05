
document.addEventListener( 'DOMContentLoaded', function () {
    window.jsSlider = []
    
    let allSliders = document.querySelectorAll('.slider-js');
    
    for (let index = 0, len = allSliders.length; index < len; index++ ) {
        let slider = allSliders[index]
        let progress = slider.querySelector('.progress')

        function updateClasses(instance, slider) {
          
            let slide = instance.details().relativeSlide
            let arrowLeft = slider.querySelector(".arrow-left")
            let arrowRight = slider.querySelector(".arrow-right")
            if(arrowRight){
                slide === 0 ? arrowLeft.classList.add("arrow--disabled") : arrowLeft.classList.remove("arrow--disabled")
            }
          
          
            if(arrowLeft){
                slide === instance.details().size - 1 ? arrowRight.classList.add("arrow--disabled") : arrowRight.classList.remove("arrow--disabled")
             }

            let dots = slider.querySelectorAll(".dot")
            if(dots){
                dots.forEach(function (dot, idx) {
                    idx === slide
                    ? dot.classList.add("dot--active")
                    : dot.classList.remove("dot--active")
                })
            }
            
        }
        
        let sliderInterval = 0;
            function autoplay(mainSlider, run) {
            clearInterval(sliderInterval);
            sliderInterval = setInterval(() => {
                if (run && mainSlider) {
                    mainSlider.next();
                }
            }, 5000);
        }
  
        let extraData = {
          created: function (instance) {
                  if(slider.querySelector(".arrow-left")){
                      slider.querySelector(".arrow-left")
                      .addEventListener("click", function () {
                            instance.prev()
                            if (progress) {
                                progress.classList.remove('active');
                                setTimeout(() => {
                                    progress.classList.add('active');
                                }, 50);
                            }
                      })
                    
                  }
                  if(slider.querySelector(".arrow-right")){
                    
                      slider.querySelector(".arrow-right")
                      .addEventListener("click", function () {
                            instance.next()
                            if (progress) {
                                progress.classList.remove('active');
                                setTimeout(() => {
                                    progress.classList.add('active');
                                }, 50);
                            }
                      })
                  }
            
                  let dots_wrapper = slider.querySelector(".dots")
                  
                  if(dots_wrapper){
                    let slides = slider.querySelectorAll(".keen-slider__slide")
                    slides.forEach(function (t, idx) {
                      let dot = document.createElement("button")
                      dot.classList.add("dot")
                      dots_wrapper.appendChild(dot)
                      dot.addEventListener("click", function () {
                          instance.moveToSlide(idx)
                      })
                     })
                   }
                updateClasses(instance, slider)
            },
          
          slideChanged(instance) {
            updateClasses(instance, slider);
            if(slider.dataset.slider){
              let dataSlider = JSON.parse(slider.dataset.slider)
              dataSlider = dataSlider;
              
              if(dataSlider.navFor){
                
                let slide = instance.details().relativeSlide;
                let size = instance.details().size;
                if(window.jsSlider[dataSlider.navFor]){
                   window.jsSlider[dataSlider.navFor].moveToSlide(slide)
                }
                
              }
            }
            
            
          }
        }
        
        if(slider.dataset.slider){
          let dataSlider = JSON.parse(slider.dataset.slider)
          
          dataSlider = dataSlider;
          dataSlider = {...dataSlider, ...extraData }
          

          if(dataSlider.progress && progress){
            progress.classList.add('active')
          }
          
          let autoPlayData = {
            dragStart: (e) => {
                autoplay(mainSlider, false)
            },
            dragEnd: (e) => {
                autoplay(mainSlider, true)
            }
          }
          
          if(dataSlider.autoplay){
            dataSlider = {...dataSlider, ...autoPlayData }
          }
          
          let selectSlider = slider.querySelector('.keen-slider');
          let mainSlider = new KeenSlider(selectSlider, dataSlider)

          if(dataSlider.autoplay){
              autoplay(mainSlider, true)
          }
          
         
          if(dataSlider.id){
              console.log("id: ", dataSlider.id);
              window.jsSlider[dataSlider.id] = mainSlider
           }
          
        }else{
          console.log("Please add the data-slider values")
        }
      
    }
  
    
});


