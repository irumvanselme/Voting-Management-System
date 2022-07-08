package rw.ac.rca.nat2022.server.utils.dtos;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class NewVehicleDTO {

    @NotEmpty
    private String chassisNumber;

    @NotEmpty
    private String manufuctureCompany;

    @NonNull
    private Short manufucturedYear;

    @NonNull
    private Double price;

    private String plateNumber;

    @NotEmpty
    private String modelName;

    private Boolean isNew;
}
